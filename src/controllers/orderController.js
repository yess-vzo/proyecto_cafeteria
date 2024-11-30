const pool = require('../config/db');

// Confirmar un pedido
exports.placeOrder = async (req, res) => {
  const { usuario_id, carrito_id, fecha_recoleccion } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO pedidos (usuario_id, carrito_id, fecha_recoleccion) 
       VALUES ($1, $2, $3) RETURNING id`,
      [usuario_id, carrito_id, fecha_recoleccion]
    );
    res.json({ message: 'Pedido realizado', pedidoId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Error al realizar pedido' });
  }
};




exports.confirmOrder = async (req, res) => {
  const { usuario_id, carrito_id, fecha_recoleccion } = req.body;

  try {
    // Obtener el contenido del carrito para el pedido
    const carritoItems = await pool.query(`
      SELECT producto_id, cantidad, tamano_id, tipo_leche_id, (precio * cantidad) AS subtotal
      FROM carrito_items
      JOIN productos ON carrito_items.producto_id = productos.id
      WHERE carrito_id = $1
    `, [carrito_id]);

    if (carritoItems.rows.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Crear el pedido en la base de datos
    const pedido = await pool.query(`
      INSERT INTO pedidos (usuario_id, carrito_id, fecha_pedido, fecha_recoleccion, estado) 
      VALUES ($1, $2, NOW(), $3, 'Pendiente') RETURNING id
    `, [usuario_id, carrito_id, fecha_recoleccion]);

    const pedidoId = pedido.rows[0].id;

    // Guardar los items del pedido
    for (const item of carritoItems.rows) {
      await pool.query(`
        INSERT INTO pedido_items (pedido_id, producto_id, cantidad, tamano_id, tipo_leche_id, precio_unitario)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        pedidoId,
        item.producto_id,
        item.cantidad,
        item.tamano_id,
        item.tipo_leche_id,
        item.subtotal / item.cantidad  // Precio unitario
      ]);
    }

    // Vaciar el carrito después de confirmar el pedido
    await pool.query(`DELETE FROM carrito_items WHERE carrito_id = $1`, [carrito_id]);

    res.json({ message: 'Pedido confirmado', pedidoId });
  } catch (err) {
    console.error('Error al confirmar el pedido:', err);
    res.status(500).json({ error: 'Error al confirmar el pedido' });
  }
};

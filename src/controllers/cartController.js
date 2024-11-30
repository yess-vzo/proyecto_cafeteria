const pool = require('../config/db');

// Crear o agregar producto al carrito
exports.addItemToCart = async (req, res) => {
  const { usuario_id, producto_id, cantidad, tamano_id, tipo_leche_id } = req.body;
  try {
    let carrito = await pool.query(`SELECT id FROM carritos WHERE usuario_id = $1`, [usuario_id]);
    let carritoId;
    if (carrito.rows.length === 0) {
      const nuevoCarrito = await pool.query(`INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING id`, [usuario_id]);
      carritoId = nuevoCarrito.rows[0].id;
    } else {
      carritoId = carrito.rows[0].id;
    }

    await pool.query(
      `INSERT INTO carrito_items (carrito_id, producto_id, cantidad, tamano_id, tipo_leche_id) 
       VALUES ($1, $2, $3, $4, $5)`,
      [carritoId, producto_id, cantidad, tamano_id, tipo_leche_id]
    );
    res.json({ message: 'Producto añadido al carrito', carritoId });
  } catch (err) {
    res.status(500).json({ error: 'Error al añadir producto al carrito' });
  }
};



// Obtener el contenido del carrito y calcular el total
exports.getCart = async (req, res) => {
  const usuario_id = req.query.usuario_id; // Recibe el usuario_id desde el frontend como parámetro de consulta
  try {
    // Verificar si el carrito del usuario existe
    const carrito = await pool.query(`
      SELECT ci.id AS item_id, p.nombre, p.precio, ci.cantidad, 
             t.descripcion AS tamano, l.descripcion AS tipo_leche,
             (p.precio * ci.cantidad) AS subtotal
      FROM carrito_items ci
      JOIN carritos c ON ci.carrito_id = c.id
      JOIN productos p ON ci.producto_id = p.id
      LEFT JOIN tamanos t ON ci.tamano_id = t.id
      LEFT JOIN tipos_leche l ON ci.tipo_leche_id = l.id
      WHERE c.usuario_id = $1
    `, [usuario_id]);

    if (carrito.rows.length === 0) {
      return res.json({ message: 'El carrito está vacío', items: [], total: 0 });
    }

    // Calcular el total del carrito
    const total = carrito.rows.reduce((acc, item) => acc + item.subtotal, 0);

    res.json({ items: carrito.rows, total });
  } catch (err) {
    console.error('Error al obtener el contenido del carrito:', err);
    res.status(500).json({ error: 'Error al obtener el contenido del carrito' });
  }
};

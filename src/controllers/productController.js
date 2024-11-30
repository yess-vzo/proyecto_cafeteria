// Obtener productos por categoría
const pool = require('../config/db');

exports.getProductsByCategory = async (req, res) => {
  const categoria = req.params.categoria;
  try {
    const result = await pool.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio 
      FROM productos p 
      JOIN categorias c ON p.categoria_id = c.id 
      WHERE c.nombre = $1
    `, [categoria]);
    
    console.log('Resultado de la consulta:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos por categoría:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener todos los productos
// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    // Asegúrate de que la tabla "productos" existe y tiene datos
    const result = await pool.query('SELECT * FROM productos');
    console.log('Productos obtenidos:', result.rows); // Muestra los productos obtenidos en la consola
    res.json(result.rows); // Enviar los productos como respuesta JSON
  } catch (err) {
    console.error('Error al obtener todos los productos:', err); // Muestra el error completo en la consola
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};


// Obtener opciones de personalización
exports.getPersonalizationOptions = async (req, res) => {
  console.log('Entrando a getPersonalizationOptions'); // Para confirmar que el endpoint es alcanzado
  try {
    const tamanos = await pool.query(`SELECT * FROM tamanos`);
    console.log('Tamaños obtenidos:', tamanos.rows); // Verifica que la consulta se ejecute

    const tiposLeche = await pool.query(`SELECT * FROM tipos_leche`);
    console.log('Tipos de Leche obtenidos:', tiposLeche.rows); // Verifica que la consulta se ejecute

    const extras = await pool.query(`SELECT * FROM extras`);
    console.log('Extras obtenidos:', extras.rows); // Verifica que la consulta se ejecute

    res.json({
      tamanos: tamanos.rows,
      tiposLeche: tiposLeche.rows,
      extras: extras.rows
    });
  } catch (err) {
    console.error('Error al obtener opciones de personalización:', err);
    res.status(500).json({ error: 'Error al obtener opciones de personalización' });
  }
};

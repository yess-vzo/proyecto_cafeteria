const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Conexión a la base de datos
require('dotenv').config();

// Registro de usuario
exports.register = async (req, res) => {
  const { email, password, nombre, apellido, telefono } = req.body; // Usamos email, nombre, apellido, y telefono

  try {
    // Verificar si el usuario ya existe en la base de datos
    const userExist = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, email, telefono, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, apellido, email, telefono, hashedPassword]
    );

    const userId = result.rows[0].id;

    res.status(201).json({ message: 'Usuario registrado correctamente', userId });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro del usuario' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su correo
    const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = userResult.rows[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};

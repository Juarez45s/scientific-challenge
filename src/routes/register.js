// src/routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Manejador de rutas para la página de registro
router.get('/', (req, res) => {
  res.render('register');
});

// Manejador de rutas para el registro de usuarios
router.post('/', (req, res) => {
  const { username, password } = req.body;
  
  // Validar los datos de entrada
  if (!username || !password) {
    return res.render('register', { error: 'Please fill in all fields.' });
  }

  // Encriptar la contraseña
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.render('register', { error: 'Error hashing password.' });
    }

    // Guardar el usuario en la base de datos
    req.getConnection((err, connection) => {
      if (err) {
        return res.render('register', { error: 'Database connection error.' });
      }

      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      connection.query(query, [username, hash], (err, results) => {
        if (err) {
          return res.render('register', { error: 'Database query error.' });
        }

        // Redirigir al login después de un registro exitoso
        res.redirect('/login');
      });
    });
  });
});

module.exports = router;

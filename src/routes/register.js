
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('register');
});


router.post('/', (req, res) => {
  const { username, password } = req.body;
  
  
  if (!username || !password) {
    return res.render('register', { error: 'Please fill in all fields.' });
  }

 
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.render('register', { error: 'Error hashing password.' });
    }

    
    req.getConnection((err, connection) => {
      if (err) {
        return res.render('register', { error: 'Database connection error.' });
      }

      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      connection.query(query, [username, hash], (err, results) => {
        if (err) {
          return res.render('register', { error: 'Database query error.' });
        }

        
        res.redirect('/login');
      });
    });
  });
});

module.exports = router;

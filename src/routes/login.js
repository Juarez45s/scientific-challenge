const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    req.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/');
                    } else {
                        res.send('Incorrect username or password');
                    }
                });
            } else {
                res.send('Incorrect username or password');
            }
        });
    });
});


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('register', { error: 'Please fill in all fields.' });
    }
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Connection error:', err);
            return res.redirect('/register');
        }
       
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.redirect('/register');
            }
            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            connection.query(query, [username, hash], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.redirect('/register');
                } else {
                    console.log('User registered:', result);
                    return res.redirect('/login');
                }
            });
        });
    });
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

module.exports = router;
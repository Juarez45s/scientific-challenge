function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
	
  } else {
    res.render('login/index');
  }
}

function register(req, res) {
  res.render('login/register');
}

db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
  if (err) throw err;

  if (results.length > 0) {
      // Si el usuario ya existe
      res.send('El nombre de usuario ya está en uso. Por favor, elige otro.');
  } else {
      // Crear el nuevo usuario si no existe
      db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password], (err) => {
          if (err) throw err;
          res.send('Usuario registrado con éxito');
      });
  }
});

function auth(req, res) {
	let email = req.body.email;
	let password = req.body.password;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if(rows.length > 0) {
        console.log(rows);
      } else {
        console.log('not');
      }
      /*
      req.session.loggedin = true;
	req.session.name = name;

  res.redirect('/');*/
      
    });
  });
}

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}


module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
}
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const path = require('path');

const app = express();
app.set('port', 4000);


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
}));
app.set('view engine', 'hbs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodelogin'
}, 'single'));


const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});



app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));



app.use('/', loginRoutes);

app.get('/', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('home', { username });
    } else {
        res.redirect('/login');
    }
});



app.get('/comienzo', (req, res) => {
    if (req.session.loggedin) {
        res.render('comienzo');
    } else {
        res.redirect('/login');
    }
});


app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('perfil', { username });
    } else {
        res.redirect('/login');
    }
});


app.post('/update-profile', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    req.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE username = ?';
        connection.query(query, [username, email, hashedPassword, req.session.username], (err, results) => {
            if (err) throw err;
            
            req.session.username = username;
            res.redirect('/');
        });
    });
});




app.get('/caida-libre', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('caida-libre', { username });
    } else {
        res.redirect('/login');
    }
});


app.get('/movimiento-parabolico', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('movimiento-parabolico', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/menu', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('menu', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/realizar-quiz', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('realizar-quiz', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/pregunta1-facil', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('pregunta1-facil', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/cinematica', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('cinematica', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/electromagnetismo', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('electromagnetismo', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/pregunta4-facil', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('pregunta4-facil', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/pregunta5-facil', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('pregunta5-facil', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/medio1', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('medio1', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/unirse-quiz', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('unirse-quiz', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/medio3', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('medio3', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/medio4', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('medio4', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/vista-controlador', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('vista-controlador', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/medio6', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('medio6', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/avanzado1', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('avanzado1', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/las-3-leyes-newthon', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('las-3-leyes-newthon', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/EL-principio-de-pascal', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('EL-principio-de-pascal', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/Tenciones', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('Tenciones', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/Vectores', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('Vectores', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/perfecto', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('perfecto', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/malo', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('malo', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/medio', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('medio', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/eleccion', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('eleccion', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/crear%20contenido', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('crear%20contenido', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/crear-quiz', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('crear-quiz', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/crear-nuevos-temas', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('crear-nuevos-temas', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/crear-new', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('crear-new', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/hacer-nuevos-temas', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('hacer-nuevos-temas', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/temas-compartidos', (req, res) => {
    if (req.session.loggedin) {
        let username = req.session.username;
        res.render('temas-compartidos', { username });
    } else {
        res.redirect('/login');
    }
});

app.get('/comienzo', (req, res) => {
    const temas = [
        { titulo: "Tema 1", descripcion: "Descripción del tema 1", imagen: "/public/img/tema1.jpg" },
        { titulo: "Tema 2", descripcion: "Descripción del tema 2", imagen: "/public/img/tema2.jpg" },
        
    ];

    res.render('comienzo', { temas });
});





app.use('/img', express.static(path.join(__dirname, 'src/views/img')));

app.listen(app.get('port'), () => {
    console.log('listening on port ', app.get('port'));
});







let quizzes = [];

app.post('/guardar-quiz', (req, res) => {
    const quiz = req.body; 
    quizzes.push(quiz); 
    res.redirect('/crear-quiz'); 
});

app.get('/crear-quiz', (req, res) => {
    res.render('crear-quiz', { quizzes }); 
});



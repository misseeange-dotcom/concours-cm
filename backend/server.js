const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function loadUsers() {
    if (!fs.existsSync('users.json')) return [];
    return JSON.parse(fs.readFileSync('users.json', 'utf8'));
}
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}


app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur Concours CM API',
        status: 'running'
    });
});

app.get('/annales', (req, res) => {
    res.json({
        annales: [
            {id: 1, concours: 'ENAM', year: 2023, subject: 'Culture Generale'},
            {id: 2, concours: 'ENAM', year:2022, suject: 'Droit'},
            {id: 3, concours: 'Douanes', year: 2023, subject: 'Mathematiques'}

        ]
    });
});
app.post('/contact', (req, res) => {
    const { name, email, message} = req.body;
    if (!name || !email || !message) {
       return res.json({ success: false, error: 'Champs manquants'});
    }

    console.log('=== NOUVEAU MESSAGE ===');
    console.log('nom :' + name);
    console.log('email :' + email);
    console.log('Message :' + message);
    console.log('======================');

    res.json({ success: true, message: 'Message recu !'});
});
app.post('/register', (req, res) => {
    const{ name, email, password} = req.body;
    if(!name || !email || !password) {
       return res.json({ success: false, error: 'Champs manquants'});
    }
    let users = loadUsers();
    let existing = users.find(u => u.email === email);
    if (existing) {
       return res.json({ success: false, error: 'Email deja utilise '});
    }
    users.push({
        id: users.length + 1,
        name,
        email,
        password,
        premium: false
    });
    saveUsers(users);
    console.log('Nouvel utilisateur :' + name);
    res.json({ success: true, message: 'compte cree !'});

});
app.post('/login', (req, res) => {
    const{email, password} = req.body;
    if (!email || !password) {
       return res.json({ success: false, error: 'Champs manquants'});
    }
    let users = loadUsers();
    let user = users.find(u => u.email === email && u.password === password);

    if(!user) {
       return res.json({ success: false, error: 'Email ou mot de passe incorrecte !'});
    }

    console.log( 'Connexion :' + user.name);
    res.json({
        success: true,
        message: 'Connecte !',
        user: { id: user.id,  name: user.name, premium: user.premium }
    });
});

app.listen(PORT, () => {
    console.log('Serveur sur le port ' + PORT);
});
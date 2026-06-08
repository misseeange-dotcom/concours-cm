const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('JSON.stringify'({
        message: 'Bienvenue sur Concours CM API',
        version: '1.0.0',
        status: 'running'
}));
    }
else if (req.url === '/annales'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        concours: [
            {id: 1, name: 'Enam', year: 2023, subject: 'Culture Generale'},
            {id: 2, name: 'Enam', year: 2022, subject: 'Droit'},
            {id: 3, name: 'Douanes', year: 2023, subject: 'Mathematiques'},]}));
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Page non trouvee' }));
        }
    });
server.listen(3000, () => {
    console.log('Serveur demarre sur le port 3000');
});
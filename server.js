const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css'
};

http.createServer((req, res) => {
    let filePath = req.url === '/' ? 'index.html' : req.url;
    let fullPath = path.join(__dirname, filePath);
    
    // Look in public folder if not found in root
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(__dirname, 'public', filePath);
    }

    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });

}).listen(3000, () => {
    console.log('Resume AI running at http://localhost:3000');
});
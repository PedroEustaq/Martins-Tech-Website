const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(PUBLIC_DIR));

// Rota principal — página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Página 404 personalizada para rotas inexistentes
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Martins Tech rodando em http://localhost:${PORT}`);
});

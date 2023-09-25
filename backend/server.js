const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://127.0.0.1/mini-fast-food';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`Erreur de connexion à la base de données : ${err}`);
    process.exit(1);
});

db.once('open', async () => {
    // Vérifier si la base de données existe en listant les collections
    const collections = await mongoose.connection.db.listCollections().toArray();

    if (collections.length === 0) {
        console.error('La base de données n\'existe pas.');
        process.exit(1);
    }

    console.log('Connecté à la base de données MongoDB.');
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

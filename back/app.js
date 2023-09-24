const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/fastfoodapp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Définissez le modèle de la commande
const OrderSchema = new mongoose.Schema({
  name: String,
  comment: String,
  classe: String,
  menu: String,
});

const Order = mongoose.model('Order', OrderSchema);

// Ajoutez une gestionnaire CORS pour autoriser les requêtes depuis le navigateur
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route pour enregistrer une commande
app.post('/api/orders', (req, res) => {
  const order = new Order(req.body);
  order.save((err, savedOrder) => {
    if (err) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement de la commande.', err });
    } else {
      res.status(200).json({ message: 'Commande enregistrée avec succès.', order: savedOrder });
    }
  });
});

// Route pour récupérer toutes les commandes
app.get('/api/orders', (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des commandes.' });
    } else {
      res.status(200).json(orders);
    }
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

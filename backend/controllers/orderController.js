const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        console.log('Requête POST reçue :', req.body); // Ajoutez cette ligne pour vérifier les données reçues.
        const order = new Order(req.body);
        order.orderNumber = await Order.countDocuments() + 1;
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error('Erreur lors de la création de la commande :', error); // Ajoutez cette ligne pour afficher les erreurs.
        res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderNumber: 1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
    }
};

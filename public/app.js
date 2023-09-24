$(document).ready(function () {
    // Soumettre un formulaire
    $('#orderForm').submit(function (event) {
      event.preventDefault();
  
      const formData = $(this).serialize();
  
      $.post('/api/orders', formData, function (data) {
        alert(data.message);
        loadOrders();
      }).fail(function (error) {
        alert('Une erreur s\'est produite lors de l\'enregistrement de la commande.');
      });
    });
  
    // Charger les commandes depuis la base de données
    function loadOrders() {
      $.get('/api/orders', function (orders) {
        const ordersContainer = $('#orders');
        ordersContainer.empty();
  
        if (orders.length === 0) {
          ordersContainer.append('<p>Aucune commande enregistrée pour le moment.</p>');
        } else {
          orders.forEach(function (order) {
            ordersContainer.append(`
              <div>
                <strong>${order.name}</strong> (${order.classe}) a commandé un ${order.menu} (${order.comment})
              </div>
            `);
          });
        }
      }).fail(function (error) {
        alert('Une erreur s\'est produite lors de la récupération des commandes.');
      });
    }
  
    // Charger les commandes lors du chargement initial de la page
    loadOrders();
  });
  
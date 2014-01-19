window.BillApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    BillApp.user = new BillApp.Models.User({ id: 1 });
    BillApp.user.fetch().done(afterDone)
  }
};

// only kick off router once all fetches have completed
var n = 0;
var afterDone = function (bool) {
  if (n > 0) {
    n -= 1;
  } else {
    console.log("SUCCESS!!!");
    BillApp.transactions = BillApp.user.get('transactions');
    BillApp.friends = BillApp.user.get('friends');
    BillApp.debts = BillApp.user.get('debts');
    BillApp.credits = BillApp.user.get('credits');
    new BillApp.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

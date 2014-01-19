window.BillApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    BillApp.user = new BillApp.Models.User({ id: 1 });
    BillApp.user.fetch().done(afterDone)
  }
};

// only kick off router once all fetches have completed
// currently not necessary, could be done with a success callback.
// leaving in for development in case more things need to be loaded
// before kickoff.
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
    BillApp.Router = new BillApp.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

window.BillApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    BillApp.user = new BillApp.Models.User({ id: 1 });
    BillApp.user.fetch().done(afterDone);
    // BillApp.transactions = new BillApp.Collections.Transaction();
    // BillApp.loans = new BillApp.Collections.Loans();
    // BillApp.credits = new BillApp.Collections.Credits();
    // BillApp.transactions.fetch.done(afterDone);
    // BillApp.loans.fetch.done(afterDone);
    // BillApp.credits.fetch.done(afterDone);
  }
};

// only kick off router once all fetches have completed
var n = 0;
var afterDone = function (bool) {
  if (n > 0) {
    n -= 1;
  } else {
    new BillApp.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

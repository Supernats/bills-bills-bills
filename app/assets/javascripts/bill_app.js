window.BillApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    BillApp.loans = new BillApp.Collections.Loans();
    BillApp.credits = new BillApp.Collections.Credits();
    BillApp.loans.fetch.done(afterDone);
    BillApp.credits.fetch.done(afterDone);
  }
};

// only kick off router once both fetches have completed
var returned = false;
var afterDone = function (bool) {
  if (!returned) {
    returned = true;
  } else {
    new BillApp.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

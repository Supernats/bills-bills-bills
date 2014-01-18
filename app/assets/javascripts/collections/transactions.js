BillApp.Collections.Transactions = Backbone.Collection.extend({
  model: BillApp.Models.Transaction,
  url: '/api/transactions'
});

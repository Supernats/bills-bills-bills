BillApp.Collections.Transactions = Backbone.Collection.extend({
  model: BillApp.Models.Transaction,
  url: '/api/transactions',
  
  comparator: function (transaction) {
    return transaction.id * -1;
  }
});

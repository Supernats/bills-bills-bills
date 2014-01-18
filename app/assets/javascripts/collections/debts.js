BillApp.Collections.Debts = Backbone.Collection.extend({
  model: BillApp.Models.Debt,
  url: '/api/debts'
});

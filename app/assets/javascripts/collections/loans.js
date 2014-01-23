BillApp.Collections.Loans = Backbone.Collection.extend({
  url: "/api/loans",

  comparator: 'transaction_id'
});

BillApp.Collections.Debts = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Debt
});

BillApp.Collections.Credits = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Credit
});

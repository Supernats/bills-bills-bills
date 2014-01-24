BillApp.Collections.Loans = Backbone.Collection.extend({
  url: "/api/loans",

  comparator: function (loan) {
    return loan.id * -1;
  }
});

BillApp.Collections.Debts = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Debt
});

BillApp.Collections.Credits = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Credit
});

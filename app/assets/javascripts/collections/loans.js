BillApp.Collections.Loans = Backbone.Collection.extend({
  url: function () {
    var url = "/transactions/" + this.transaction_id + "/loans";
    return url;
  }
});

BillApp.Collections.Debts = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Debt
});

BillApp.Collections.Credits = BillApp.Collections.Loans.extend({
  model: BillApp.Models.Credit
});

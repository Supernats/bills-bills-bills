BillApp.Models.Loan = Backbone.Model.extend({
  initialize: function (options) {
    this.creditor_id = options.creditor_id;
    this.debtor_id = options.debtor_id;
    this.amount = options.amount;
  }
});

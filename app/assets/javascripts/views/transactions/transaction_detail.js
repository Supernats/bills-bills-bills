// var transaction = BillApp.transactions.get(id);
BillApp.Views.TransactionDetail = Backbone.View.extend({
  template: JST['transactions/transaction_detail'],

  render: function () {
    debugger
    var creditor = {
      this.getDisplayNameFromId(this.model.get('creditor_id')):
        this.model.get('creditor_share')
    };
    var debtorsObject = this.makeDebtorsObject();

    var renderedContent = this.template({
      transaction: this.model,
      creditor: this.creditor,
      debtors: this.makeDebtorsObject()
    });
    this.$el.html(renderedContent);
    return this;
  },

  getDisplayNameFromId: function (id) {
    var user = BillApp.otherUsers.get(id);
    if (user.get('username')) {
      return user.get('username');
    } else {
      return user.get('email');
    }
  }, 

  makeDebtorsObject: function () {
    debugger
    var debtorsObject = {};

    _.each(this.model.get('debtor_ids'), function (debtorId, index) {
      loan = _.filter(this.model.get('loans'), function (l, index) {
        return l.debtor_id === debtorId;
      })[0];

      name = getDisplayNameFromId(debtorId);
      debtorsObject[name] = loan.amount;
    });
    return debtorsObject;
  }
  
});

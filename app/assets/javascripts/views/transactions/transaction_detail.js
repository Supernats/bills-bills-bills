BillApp.Views.TransactionDetail = Backbone.View.extend({
  template: JST['transactions/transaction_detail'],

  render: function () {
    var creditor = {};
    var creditorName = this.getDisplayNameFromId(this.model.get('creditor_id'));
    var creditorShare = this.model.get('creditor_share');
    creditor[creditorName] = creditorShare;
    var debtorsObject = this.makeDebtorsObject();

    var renderedContent = this.template({
      transaction: this.model,
      creditor: creditor,
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
    var that = this;
    var debtorsObject = {};

    _.each(this.model.get('debtor_ids'), function (debtorId, index) {
      var loan = _.filter(that.model.get('loans'), function (l, index) {
        return l.debtor_id === debtorId;
      })[0];

      name = that.getDisplayNameFromId(debtorId);
      debtorsObject[name] = loan.amount;
    });
    return debtorsObject;
  }
  
});

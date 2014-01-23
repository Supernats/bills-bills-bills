BillApp.Views.TransactionDirect = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['transactions/transaction_direct'],

  initialize: function (options) {
    this.transaction = options.transaction;
    this.creditor = options.creditor;
    this.debtor = options.debtor;
  },

  render: function () {
    var renderedContent = this.template({
      creditor: this.creditor,
      transaction: this.transaction,
      debtor: this.debtor
    })
    this.$el.html(renderedContent)
    return this;
  }

});

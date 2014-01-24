BillApp.Views.TransactionIndex = Backbone.View.extend({
  template: JST['transactions/transaction_index'],

  events: {
    'click .transaction-row': 'visitTransactionPage',
    'mouseenter .transaction-row': 'toggleFocus',
    'mouseleave .transaction-row': 'toggleFocus'
  },

  render: function () {
    var debts = BillApp.user.get('debts');
    var credits = BillApp.user.get('credits');
    var loans = new BillApp.Collections.Loans(debts.models.concat(credits.models));
    loans.sort();
    var renderedContent = this.template({
      loans: loans
    });
    this.$el.html(renderedContent);
    this.styleRows();
    return this;
  },

  styleRows: function () {
    this.$('.transaction-row').each( function () {
      if ($(this).attr('data-type') === 'debt') {
        $(this).addClass('danger');
      } else {
        $(this).addClass('success');
      }
    });
  },

  toggleFocus: function (event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass('has-warning');
  },

  visitTransactionPage: function(event) {
    event.preventDefault();
    transactionUrl = "transactions/" + $(event.currentTarget).attr('data-id');
    BillApp.router.navigate(transactionUrl, { trigger: true });
  }

})

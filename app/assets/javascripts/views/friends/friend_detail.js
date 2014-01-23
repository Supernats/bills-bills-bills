BillApp.Views.FriendDetail = Backbone.View.extend({
  template: JST['friends/friend_detail'],

  events: {
    'click #friend_settle': 'settle'
  },

  render: function () {
    var renderedContent = this.template({
      friend: this.model,
      balance: this.model.get('balance'),
      friendCredits: BillApp.credits.where({
        debtor_id: this.model.id
      }),
      friendDebts: BillApp.debts.where({
        creditor_id: this.model.id
      })
    });
    this.$el.html(renderedContent);
    return this;
  },

  settle: function (event) {
    event.preventDefault();
    var transaction = new BillApp.Models.Transaction();
    transaction.set({
      description: "Settle up with " + this.model.get('email'),
      total: this.model.get('balance') * -1
    });
    var paymentView = new BillApp.Views.TransactionDirect({
      transaction: transaction,
      creditor: BillApp.user,
      debtor: this.model
    });
    console.log(transaction)
  }
});

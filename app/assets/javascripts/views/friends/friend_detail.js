BillApp.Views.FriendDetail = Backbone.View.extend({
  template: JST['friends/friend_detail'],

  // initialize: function () {
  //   this.listenTo(this.model.collection, 'add', this.render);
  // },

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
    var transaction = new BillApp.Models.Transaction();
    transaction.set({
      description: "Settle up with " + this.model.get('email'),
      total: this.model.get('balance') * -1
    });

    BillApp.router.transactionNew({
      transaction: transaction,
      creditor: BillApp.user,
      debtor: this.model
    });
    Backbone.history.navigate("#transactions/new");
    }
});

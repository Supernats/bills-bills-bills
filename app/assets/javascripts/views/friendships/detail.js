BillApp.Views.FriendDetail = Backbone.View.extend({
  template: JST['friends/detail'],
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
  }
});

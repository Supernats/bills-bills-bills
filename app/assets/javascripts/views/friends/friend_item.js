BillApp.Views.FriendItem = Backbone.View.extend({
  template: JST['friends/friend_item'],

  render: function () {
    var totalCredit = BillApp.user.get('total_owed_by_other_users');
    var totalDebt = BillApp.user.get('total_owed_to_other_users');
    var debtors = _.filter(BillApp.friends.models, function (friend) {
      return friend.get('balance') > 0
    }); 
    var creditors = _.filter(BillApp.friends.models, function (friend) {
      return friend.get('balance') < 0
    });
    var renderedContent = this.template({
      totalCredit: totalCredit,
      totalDebt: totalDebt,
      debtors: debtors,
      creditors: creditors
    });
    this.$el.html(renderedContent);
    return this;
  }
});

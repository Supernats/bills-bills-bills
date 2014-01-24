BillApp.Views.UserDetail = Backbone.View.extend({
  template: JST['user/user_detail'],

  events: {
    "click .friend-row": "visitFriendPage",
    "mouseenter .friend-row": "toggleFocus",
    "mouseleave .friend-row": "toggleFocus"
  },

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
    this.styleRows();
    return this;
  },

  toggleFocus: function (event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass('success');
    $(event.currentTarget).toggleClass('danger');
  },

  styleRows: function () {
    this.$('.friend-row').each( function () {
      if ($(this).attr('data-type') === 'debt') {
        $(this).addClass('danger');
      } else {
        $(this).addClass('success');
      }
    });
  },

  visitFriendPage: function(event) {
    event.preventDefault();
    friendUrl = "friends/" + $(event.currentTarget).attr('data-id');
    BillApp.router.navigate(friendUrl, { trigger: true });
  }

});

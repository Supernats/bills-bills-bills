BillApp.Views.FriendIndex = Backbone.View.extend({
  template: JST['friends/friend_index'],

  events: {
    "click .friend-row": "visitFriendPage",
    "mouseenter .friend-row": "toggleFocus",
    "mouseleave .friend-row": "toggleFocus"
  },

  render: function () {
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },

  toggleFocus: function (event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass('success');
  },

  visitFriendPage: function(event) {
    event.preventDefault();
    friendUrl = "friends/" + $(event.currentTarget).attr('data-id');
    BillApp.router.navigate(friendUrl, { trigger: true });
  }

});

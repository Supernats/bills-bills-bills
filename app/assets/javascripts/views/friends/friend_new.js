BillApp.Views.FriendNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['friends/friend_new'],

  events: {
    "submit": "submit"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    var that = this;
    var prospectiveFriend;

    event.preventDefault();
    var email = $('#friend_email').val();
    if (!that.checkForExtantUser(email)) {
      that.createUnregisteredUser(email, function (model) {
        prospectiveFriend = model;
        that.createFriend(prospectiveFriend.id, function(response) {
          BillApp.friends.fetch({ success: function () {
            BillApp.router.navigate("#friends/" + prospectiveFriend.id, { trigger: true });
            }
          });
        });
      });
    } else {
      prospectiveFriend = BillApp.otherUsers.findWhere({ email: email });
      that.createFriend(prospectiveFriend.id, function(response) {
        BillApp.friends.fetch({ success: function () {
          BillApp.router.navigate("#friends/" + prospectiveFriend.id, { trigger: true });
          }
      });
    });
    }
  },

  checkForExtantUser: function (email) {
    return BillApp.otherUsers.findWhere({ email: email }) ? true : false;
  },

  createUnregisteredUser: function (email, callback) {
    var newUser = new BillApp.Models.OtherUser({
      email: email
    });
    newUser.save({},{
      success: callback
    });
    return newUser;
  },

  createFriend: function (friendId, callback) {
    var newFriend = new BillApp.Models.Friend({
      target_friend_id: friendId,
      source_friend_id: BillApp.user.id
    });
    newFriend.save({}, { success: callback });
    BillApp.friends.add(newFriend);
  },

});

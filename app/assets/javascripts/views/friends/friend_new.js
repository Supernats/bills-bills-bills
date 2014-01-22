// collection: BillApp.friends,
// otherUsers: BillApp.otherUsers
BillApp.Views.FriendNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['friends/friend_new'],

  render: function () {

  },

  submit: function (event) {
    var that = this;
    var prospectiveFriend;

    event.preventDefault();
    var email = $('#friend_email').val();
    if (!that.checkForExtantUser(email)) {
      that.createUnregisteredUser(email, function () {
        prospectiveFriend = model;
      });
    } else {
      prospectiveFriend = otherUsers.findWhere({ email: email });
    }
    that.createFriendship(prospectiveFriend.id);
  },

  checkForExtantUser: function (email) {
    return otherUsers.findWhere({ email: email }) ? true : false;
  },

  createUnregisteredUser: function (email, callback) {
    var newUser = new BillApp.Models.OtherUser({
      email: email
    });
    newUser.save({
      wait: true,
      success: callback
    });
    return newUser;
  },

  createFriend: function (friendId) {
    var newFriend = new Backbone.Models
  },

});

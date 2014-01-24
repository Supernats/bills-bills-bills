BillApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "userDetail",
    "transactions": "transactionIndex",
    "transactions/new": "transactionNew",
    "transactions/:id": "transactionDetail",
    "friends": "friendIndex",
    "friends/new": "friendNew",
    "friends/:id": "friendDetail"
  },

  userDetail: function() {
    BillApp.user.fetch({ success: function () {
      debugger
      var view = new BillApp.Views.UserDetail();
      this._swapView(view);
    }
    });
  },

  friendIndex: function () {
    var view = new BillApp.Views.FriendIndex();
    this._swapView(view);
  },

  friendNew: function () {
    var that = this;
    BillApp.otherUsers.fetch().done(_createView);
    function _createView () {
      var view = new BillApp.Views.FriendNew({
        model: new BillApp.Models.Friend(),
        collection: BillApp.friends,
      });
      that._swapView(view);
    }
  },

  friendDetail: function (id) {
    var view = new BillApp.Views.FriendDetail({
      model:  BillApp.friends.get(id)
    });
    this._swapView(view);
  },

  transactionNew: function (options) {
    if (!options) {
      var options = {};
    }
    var view = new BillApp.Views.TransactionNew(options);
    this._swapView(view);
  },

  transactionIndex: function () {
    var that = this;
    BillApp.user.fetch().done(_createView);

    var n = 0;
    function _createView() {
      if (n > 0) {
        n--;
      } else {
        var view = new BillApp.Views.TransactionIndex();
        that._swapView(view);
      }
    }
  },

  transactionDetail: function (id) {
    var that = this;
    var transaction = BillApp.transactions.get(id);
    BillApp.otherUsers.fetch().done(_createView);
    transaction.fetch().done(_createView);

    var n = 1;
    function _createView() {
      if (n > 0) {
        n--;
      } else {
        var view = new BillApp.Views.TransactionDetail({
          model: transaction
        });
        that._swapView(view);
      }
    }
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});

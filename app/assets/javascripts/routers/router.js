BillApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "friendIndex",
    "transactions": "transactionIndex",
    "transactions/new": "transactionNew",
    "transactions/:id": "transactionDetail",
    "friends": "friendIndex",
    "friends/new": "friendNew",
    "friends/:id": "friendDetail"
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

  transactionNew: function () {
    var view = new BillApp.Views.TransactionNew();
    this._swapView(view);
  },

  transactionIndex: function () {
    var view = new BillApp.Views.TransactionIndex({
      collection: BillApp.transactions,
    });
    this._swapView(view);
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
    this._current_view = view;
    this.$rootEl.html(view.render().$el);
  }
});

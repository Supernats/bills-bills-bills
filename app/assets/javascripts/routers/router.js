BillApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "friendIndex",
    "transactions": "transactionIndex",
    "transactions/new": "transactionNew",
    "transactions/:id": "transactionDetail",
    "debts": "debtIndex",
    "debts/new": "debtNew",
    "debts/:id": "debtShow",
    "credits": "creditIndex",
    "credits/new": "creditNew",
    "credits/:id": "creditShow",
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

  transactionDetail: function () {
    var transaction = BillApp.transactions.get(id);
    var view = new BillApp.Views.TransactionShow({
      model: transaction
    });
    this._swapView(view);
  },

  debtIndex: function () {
    var view = new BillApp.Views.LoanIndex({
      collection: BillApp.debts
      });
    this._swapView(view);
  },

  debtNew: function () {
    var view = new BillApp.Views.DebtNew({
      collection: BillApp.debts,
      model: new BillApp.Models.Debt()
    });
    this._swapView(view);
  },

  debtShow: function () {
    var debt = BillApp.debts.get(id);
    var view = new BillApp.Views.DebtShow({
      model: debt
    });
    this._swapView(view);
  },

  creditIndex: function () {
    var view = new BillApp.Views.LoanIndex({
      collection: BillApp.credits
      });
    this._swapView(view);
  },

  creditNew: function () {
    var view = new BillApp.Views.DebtNew({
      collection: BillApp.credits,
      model: new BillApp.Models.Debt()
    });
    this._swapView(view);
  },

  creditShow: function () {
    var credit = BillApp.credits.get(id);
    var view = new BillApp.Views.DebtShow({
      model: credit
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._current_view = view;
    this.$rootEl.html(view.render().$el);
  }
});

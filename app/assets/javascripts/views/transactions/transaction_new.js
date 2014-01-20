BillApp.Views.TransactionNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['transactions/transaction_new'],

  events: {
    "submit": "submit",
    "click #add-debtor": "addDebtor"
  },

  render: function () {
    var view = this;
    var renderedContent = view.template({ });
    view.$el.html(renderedContent);
    return view;
  },

  submit: function (event) {
    event.preventDefault;
    var creditorId = getCreditorId();
  },

  fireNewLoans: function (creditorId, debtorObject) {
                },

  getCreditorId: function () {
    var creditorName = $('#creditor').val();
    getUserId(creditorName);
  },

  getUserId: function (userName) {
    if (userName === BillApp.user.get("username")) {
      var user = BillApp.user;
    } else {
      var user = BillApp.friends.findWhere({
        "username": userName
      });
    }
    return user.id;
  },

  getDebtorIds: function () {
    var debtorIds = [];
    var $debtors = $('.debtor');
    $debtors.each(function (i) {
      var debtorName = this.val();
      debtorIds.push(getUserId(debtorName));
    }
  }
});

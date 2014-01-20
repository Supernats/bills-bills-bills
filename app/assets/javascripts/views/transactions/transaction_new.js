BillApp.Views.TransactionNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['transactions/transaction_new'],

  events: {
    "submit": "submit",
    "click #add-debtor": "addDebtor"
  },

  render: function () {
    var renderedContent = this.template({ });
    this.$el.html(renderedContent);
    return this;
  },

  addDebtor: function (event) {
    var loanNew = new BillApp.Views.LoanNew();
    this.$('#debtors').append(loanNew.render().$el);
  },

  submit: function (event) {
    event.preventDefault();
    var newTransaction = new BillApp.Models.Transaction({

    });
    var creditorId = getCreditorId();
    var debtorsObject = makeDebtorsObject();
    fireNewLoans(creditorId, debtorsObject);
  },

  fireNewLoans: function (creditorId, debtorsObject) {
    _.each(debtorsObject, function (loanAmount, debtorId) {
      loan = new BillApp.Models.Loan({
        creditor_id: creditorId,
        debtor_id: debtorId,
        amount: loanAmount
      });
      loan.save();
    });
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

  // TA/Ned question
  // should getting amounts and ids be deferred to individual loan views?

  getDebtorIds: function () {
    var debtorIds = [];
    $('.debtor').each(function (debtor) {
      var debtorName = debtor.val();
      debtorIds.push(getUserId(debtorName));
    });
    return debtorIds;
  },

  getLoanAmounts: function () {
    var loanAmounts = [];
    $('.amount').each(function (i) {
      loanAmounts.push(this.val());
    });
    return loanAmounts;
  },

  makeDebtorsObject: function () {
    var debtorsObject = {};
    var debtorIds = getDebtorIds();
    var loanAmounts = getLoanAmounts();
    _.each(debtorIds, function (debtorId, index) {
      debtorsObject[debtorIds[index]] = loanAmounts[index];
    });
    return debtorsObject;
  }
});

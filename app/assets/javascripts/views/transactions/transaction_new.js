BillApp.Views.TransactionNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['transactions/transaction_new'],

  events: {
    "click #transaction_submit": "submit",
    "click #add_debtor": "addDebtor",
    "click #split_evenly": "splitEvenly"
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
    var that = this;
    var params = $(
      event.
      currentTarget.
      parentElement.
      parentElement
    ).serializeJSON()["transaction"];
    var newTransaction = new BillApp.Models.Transaction(params);
    newTransaction.save({},
      { success: function (response) {
        var transactionId = response.id;
        var creditorId = that.getCreditorId();
        var debtorsObject = that.makeDebtorsObject();
        that.fireNewLoans(transactionId, creditorId, debtorsObject);
      }
    });
  },

  fireNewLoans: function (transactionId, creditorId, debtorsObject) {
    _.each(debtorsObject, function (loanAmount, debtorId) {
      loan = new BillApp.Models.Loan({
        transaction_id: transactionId,
        creditor_id: creditorId,
        debtor_id: debtorId,
        amount: loanAmount
      });
      debugger
      loan.save();
    });
  },

  getCreditorId: function () {
    var creditorName = $('#creditor_name').val();
    return this.getUserId(creditorName);
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

  splitEvenly: function (event) {
    event.preventDefault();
    var total = $('#transaction_total').val();
    var parties = $('.debtor-name').length + $('#creditor_name').length;
    var evenShare = Math.floor(total / parties);
    var remnant = total % parties;
    var splits = [];
    _(parties).times(function (index) {
      splits.push(evenShare);
      if (remnant > 0) {
        splits[index]++;
        remnant--;
      }
    });
    $('#creditor_share').val(splits.shift());
    $('.debtor-share').each(function (index) {
      $(this).val(splits.shift());
    });
  },

  // TA/Ned question
  // should getting amounts and ids be deferred to individual loan views?

  getDebtorIds: function () {
    var that = this;
    var debtorIds = [];
    $('.debtor-name').each(function (index) {
      debtorIds.push(that.getUserId($(this).val()));
    });
    return debtorIds;
  },

  getLoanAmounts: function () {
    var loanAmounts = [];
    $('.debtor-share').each(function (index) {
      loanAmounts.push($(this).val());
    });
    return loanAmounts;
  },

  makeDebtorsObject: function () {
    var debtorsObject = {};
    var debtorIds = this.getDebtorIds();
    var loanAmounts = this.getLoanAmounts();
    _.each(debtorIds, function (debtorId, index) {
      debtorsObject[debtorIds[index]] = loanAmounts[index];
    });
    return debtorsObject;
  }
});

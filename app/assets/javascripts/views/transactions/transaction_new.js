BillApp.Views.TransactionNew = Backbone.View.extend({
  tagName: 'form',
  className: 'form',
  template: JST['transactions/transaction_new'],

  initialize: function (options) {
    if (options.transaction) {
      this.transaction = options.transaction;
    }
    if (options.creditor) {
      this.creditor = options.creditor;
    }
    if (options.debtor) {
      this.debtor = options.debtor;
    }
  },

  events: {
    "click #transaction_submit": "submit",
    "click #add_debtor": "addDebtor",
    "keyup #transaction_total": "splitEvenly",
    "click .unmodified-amount": "clearField",
    "keyup .modified-amount": "splitEvenly"
  },

  render: function () {
    var renderedContent = this.template({ });
    this.$el.html(renderedContent);
    this.fillFields();
    return this;
  },

  addDebtor: function (event) {
    event.preventDefault();
    var loanNew = new BillApp.Views.LoanNew();
    this.$('#debtors').prepend(loanNew.render().$el);
  },

  clearField: function (event) {
    if (!this.checkForLastField(event)) {
      var field = $(event.currentTarget);
      field.val('');
      field.removeClass('unmodified-amount');
      field.addClass('modified-amount');
      this.splitEvenly(event);
    }
  },

  fillFields: function () {
    if (this.transaction) {
      var loanNew = new BillApp.Views.LoanNew();
      this.$('#transaction_description').val(this.transaction.escape('description'));
      this.$('#transaction_total').val(this.transaction.escape('total'));
      this.$('#debtors').prepend(loanNew.render().$el);
      this.$('#creditor_name').val(this.creditor.escape('email'));
      this.$('#creditor_share').val(0);
      this.$('#creditor_share').toggleClass('unmodified-amount');
      this.$('#creditor_share').toggleClass('modified-amount');
      this.$('.debtor-share').val(this.transaction.escape('total'));
      this.$('.debtor-name').val(this.debtor.escape('email'));
      this.$('.debtor-share').toggleClass('unmodified-amount');
      this.$('.debtor-share').toggleClass('modified-amount');
      this.$('#add_debtor').remove();
    }
  },

  checkForLastField: function (event) {
    var lastField = false;
    if ($('.unmodified-amount').length ===  1
        && $('.debtor-share').length > 0
        && !this.transaction) {
      window.alert("Don't worry; we'll do the math for you.");
      lastField = true;
    }
    return lastField;
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
        BillApp.transactions.add(newTransaction);
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
      loan.save();
    });
    BillApp.router.navigate("transactions/" + transactionId, { trigger: true });
  },

  getCreditorId: function () {
    var creditorName = $('#creditor_name').val();
    return this.getUserId(creditorName);
  },

  getUserId: function (text) {
    if (this.getUserIdByUsername(text)) {
      return this.getUserIdByUsername(text);
    } else {
      return this.getUserIdByEmail(text)
    }
  },

  getUserIdByUsername: function (username) {
    if (username === BillApp.user.get('username')) {
      var user = BillApp.user
    } else {
      var user = BillApp.friends.findWhere({
        "username": username
      });
    }
    if (user) {
      return user.id
    }
  },

  getUserIdByEmail: function (email) {
    if (email === BillApp.user.get('email')) {
      var user = BillApp.user
    } else {
      var user = BillApp.friends.findWhere({
        "email": email
      });
    }
    if (user) {
      return user.id
    }
  },

  splitEvenly: function (event) {
    var total = $('#transaction_total').val();
    var modifiedAmount = 0;
    $('.modified-amount').each( function (index) {
      var modifier = parseInt($(this).val()) > 0 ? parseInt($(this).val()) : 0;
      modifiedAmount += modifier;
    });
    total -=  modifiedAmount;
    var parties = $('.unmodified-amount').length;
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
    $('.unmodified-amount').each(function (index) {
      $(this).val(splits.shift());
    });
  },

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

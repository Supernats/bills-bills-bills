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
  }

});

BillApp.Views.LoanNew = Backbone.View.extend({
  template: JST['loans/loan_new'],

  // events: {
  //   'click .remove-debtor': 'removeDebtor'
  // },

  render: function () {
    var view = this;
    var renderedContent = view.template({ });
    view.$el.html(renderedContent);
    return view;
  }

});

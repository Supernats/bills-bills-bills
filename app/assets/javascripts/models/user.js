BillApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users/",

  parse: function(response) {
    var user = this;

    var friends = response.friends;
    friends.parent_id = user.id;
    response.friends = new BillApp.Collections.Friends(friends);

    var transactions = response.transactions;
    response.transactions = new BillApp.Collections.Transactions(transactions);

    var debts = response.debts;
    response.debts = new BillApp.Collections.Debts(debts);

    var credits = response.credits;
    response.credits = new BillApp.Collections.Credits(credits);
    return response;
  }

});

BillApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users/",

  parse: function(data) {
    console.log(data);
  }

});

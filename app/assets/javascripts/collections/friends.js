BillApp.Collections.Friends = Backbone.Collection.extend({
  url: function () {
    var url = "/users/" + this.parent_id + "/friends";
    return url;
  },

  model: BillApp.Models.Friend
});

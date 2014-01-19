BillApp.Collections.Friends = Backbone.Collection.extend({
  url: "/api/friends",
  model: BillApp.Models.Friend
});

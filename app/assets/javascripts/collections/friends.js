BillApp.Collections.Friends = Backbone.Collection.extend({
  url: "/api/friendships",
  model: BillApp.Models.Friendship
});

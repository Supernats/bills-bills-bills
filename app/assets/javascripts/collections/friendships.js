BillApp.Collections.Friendships = Backbone.Collection.extend({
  url: "/api/friendships",
  model: BillApp.Models.Friendship
});

BillApp.Collections.OtherUsers = Backbone.Collection.extend({
  model: BillApp.Models.OtherUser,
  url: '/api/users'
});

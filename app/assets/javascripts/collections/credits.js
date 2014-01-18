BillApp.Collections.Credits = Backbone.Collection.extend({
  model: BillApp.Models.Credit,
  url: '/api/credits'
});

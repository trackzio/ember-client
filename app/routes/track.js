import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
  	console.log(params);
    //return this.get('store').find('track', 'ff8081814ad3e113014ad4b4c9a9000e');
    return this.get('store').find('track', params.track_id);
  }
});
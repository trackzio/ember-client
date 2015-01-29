import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('points', function(){
    this.resource('point', { path: '/:point_id' }, function(){
    });
  });
  
  this.resource('tracks', function(){
    this.resource('track', { path: '/:track_id' }, function(){
    });
  });
});

export default Router;

//import Ember from "ember";
import DS from "ember-data";

export default DS.RESTAdapter.extend({
	host: 'http://api.trackz.io/v1'
});
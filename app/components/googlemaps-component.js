/*global google */

import Ember from 'ember';

export default Ember.Component.extend({
	polygonCoords: [],
	firstTime: true,
	lastMarker: null,
	insertMap: function() {
	    var container = this.$(".map-canvas");
	    var options = {
			center: new google.maps.LatLng("48.311196", "14.29829"),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles:[{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
		};
		this.set('map', new google.maps.Map(container[0], options));
		this.schedule();
	}.on('didInsertElement'),

	schedule: function() {
		this._timer = Ember.run.later(this, 'setMarkers', 1000);
	},

	setMarkers: function() {
		var map = this.get('map'),
			markers = this.get('markers'),
			latitude = "48.311196",
			longitude = "14.29829",
			polygonCoords = [],
			old = this.get('lastMarker');

		// fill up middle points with polylines
		markers.forEach(function(marker){
			if(typeof(marker.get('latitude')) !== "undefined" && typeof(marker.get('longitude')) !== "undefined" ) {
				polygonCoords.push(new google.maps.LatLng(marker.get('latitude'), marker.get('longitude')));
				latitude = marker.get('latitude');
				longitude = marker.get('longitude');
			}
		}, this);
		// trigger setPolyline
		this.set('polygonCoords', polygonCoords);

		if (old) {
			old.setPosition(new google.maps.LatLng(latitude, longitude));
		} else {
			// set last marker
			this.set('lastMarker', new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				icon: 'http://adtime.at/img/marker30x30.png'
			}));
		}

		if(this.firstTime){
			map.setCenter(new google.maps.LatLng(latitude, longitude));
			this.firstTime = false;
		}

		this.schedule();
	},

	setPolyline: function(){
		this.polyline = new google.maps.Polyline({
			path: this.polygonCoords,
			strokeColor: "#4b4b4b",
			strokeOpacity: 1.0,
    		strokeWeight: 2
		});
		this.polyline.setMap(this.get('map'));
	}.observes('polygonCoords')
});

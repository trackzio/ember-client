import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    emergencyContact: DS.attr('string'),
    battery: DS.attr('string'),
    movementType: DS.attr('number'),
    secret: DS.attr('string'),
    start: DS.attr('date'),
    end: DS.attr('date'),
    active: DS.attr('boolean'),
    created: DS.attr('date'),
    updated: DS.attr('date'),
    points: DS.hasMany('point', { async: true }),
    didLoad: function(){
      var self = this;
      setInterval(function() {
        self.get('points').reload();
      }, 5000); //every 5 seconds
    }
});

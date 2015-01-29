import DS from 'ember-data';

export default DS.Model.extend({
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),
    altitude: DS.attr('string'),
    signalStrength: DS.attr('string'),
    battery: DS.attr('number'),
    activity: DS.attr('string'),
    created: DS.attr('date'),
    updated: DS.attr('date'),
    track: DS.belongsTo('track', { async: true })
});
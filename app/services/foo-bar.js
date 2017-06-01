import Ember from 'ember';

export default Ember.Service.extend({
	property:null,
	user:null,
	
	setProperty(thing){
		this.set('property', thing);
	},
	
	getProperty(){
		return this.property;
	}
});
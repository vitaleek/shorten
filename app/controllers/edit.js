import Ember from 'ember';

export default Ember.Controller.extend({
	fooBar: Ember.inject.service('foo-bar'),
	
	actions:{
		click(){
			alert(this.get('fooBar').getProperty());
		}
	}
});

import Ember from 'ember';

export default Ember.Controller.extend({
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
});

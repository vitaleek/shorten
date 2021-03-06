import Ember from 'ember';

export default Ember.Route.extend({
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
	  model: function() {
		  let fooBar = this.get('fooBar');
		  if (!fooBar.getProperty()) this.transitionTo('surl.login');

		  return this.store.findAll('url');
		 }
	
});

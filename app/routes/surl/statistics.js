import Ember from 'ember';

export default Ember.Route.extend({
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
	model() {
		let fooBar = this.get('fooBar');
		if (!fooBar.getProperty()) this.transitionTo('surl.login');
		
        return this.store.query('url',{filter:{user:fooBar.getProperty()}});
    }
	
	
	
});
								
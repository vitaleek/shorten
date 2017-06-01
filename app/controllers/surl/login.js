import Ember from 'ember';

export default Ember.Controller.extend({
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
	actions: {
		goToRoute(l) {
			this.get('fooBar').setProperty(l);
			this.get('fooBar').set('user', l);
			this.transitionToRoute('surl.logon');
			console.log('goToRoute handled in login-controller  ' + l);
		} 
	}
});

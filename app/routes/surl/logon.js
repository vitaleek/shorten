import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
	model: function() {
		 let fooBar = this.get('fooBar');
		 if (!fooBar.getProperty()) this.transitionTo('surl.login');

		 return this.store.findAll('url');
	}
  

});

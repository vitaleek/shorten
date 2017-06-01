import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({
  store: Ember.inject.service(),
  fooBar: Ember.inject.service('foo-bar'),
  
  /*currentUser: Ember.computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
		let fooBar = this.get('fooBar');
		const promise = this.get('store').queryRecord('user', {filter:{login: fooBar.getProperty()}})
		return DS.PromiseObject.create({ promise: promise })
		return fooBar.getProperty();
    }
  })*/
  currentUser: Ember.computed(function() {
	  let fooBar = this.get('fooBar');
	  return this.get('store').queryRecord('user', {filter:{login: fooBar.getProperty()}})
	})
});


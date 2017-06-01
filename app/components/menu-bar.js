import Ember from 'ember';

export default Ember.Component.extend({
	fooBar: Ember.inject.service('foo-bar'),
	authManager: Ember.inject.service('session')
});

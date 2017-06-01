import Ember from 'ember';

export default Ember.Component.extend({
	authManager: Ember.inject.service('session'),
	fooBar: Ember.inject.service('foo-bar'),
	
	//tagName: 'li',
	classNameBindings: ['editing'],
    editing: false,
    actions: {
        editThing() {
            this.toggleProperty('editing');
        },
		submitThing() {
			this.sendAction('updateUrl', this.get('url'));
			this.set('editing', false);
		}
    }
	
});



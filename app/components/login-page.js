import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service('session'),
  fooBar: Ember.inject.service('foo-bar'),
  
  actions: {
    authenticate() {
		//var self = this;
      const { login, password } = this.getProperties('login', 'password');
  
        this.get('authManager').authenticate('authenticator:oauth2', login, password).then(() => {
			//this.get('fooBar').setProperty(login);
			//this.get('fooBar').set('user', login);
			this.sendAction('goToRoute', login);
			
			alert('AUTHORIZATION SUCCESSFUL!');
										
		
      }, (error) => {
         alert('Something WRONG: '  + error.error);
      });
	  
    }
  }
});


   
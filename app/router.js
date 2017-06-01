import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  
  this.route('surl', { path: '/' }, function() {
    this.route('login');
    this.route('register');
    this.route('info');
    this.route('logon');
    this.route('shorter');
    this.route('statistics');
    this.route('tags');
    this.route('contacts');
    this.route('login2');
  });
});

export default Router;

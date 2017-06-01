import Ember from 'ember';

export default Ember.Controller.extend({
	fooBar: Ember.inject.service('foo-bar'),
	authManager: Ember.inject.service('session'),
	
	actions: {
        
        updateUrl(url) {
			// Собираем объект JSON
			let fooBar = this.get('fooBar');
			var ad = url.get('address');
			var sh = url.get('shortLink');
			var de = url.get('description');
			var da = url.get('date');
			var st = url.get('stat');
			var us = url.get('user');
			var t1 = (url.get('tags') && url.get('tags').tag1) ? url.get('tags').tag1 : '';
			var t2 = (url.get('tags') && url.get('tags').tag2) ? url.get('tags').tag2 : '';
			var t3 = (url.get('tags') && url.get('tags').tag3) ? url.get('tags').tag3 : '';
			var t4 = (url.get('tags') && url.get('tags').tag4) ? url.get('tags').tag4 : '';
			var t5 = (url.get('tags') && url.get('tags').tag5) ? url.get('tags').tag5 : '';
			// Отсылаем в бэк-энд URL = 'api/urls/'
			this.get('store').createRecord(
			'url', {
			  address: ad,
			  shortLink: sh,
			  description: de,
			  date: da,
			  stat: st, 
			  user: us,
			  tags: {tag1: t1,
					 tag2: t2,
					 tag3: t3,
					 tag4: t4,
					 tag5: t5
			  }
			}).save();
			
			
			console.log('handled in the controller, JSON is sent to back');
			
        }
        
    }
});

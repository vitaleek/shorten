import Ember from 'ember';

export default Ember.Controller.extend({
	saver: Ember.inject.service(),
	
	actions: {
		getLink(){
			let saver = this.get('saver');
			var sh = this.get('slink');
			this.get('store').queryRecord('url', {filter:{shortLink: sh}}).then((link) => {
					if (link) {	
						saver.set('description', link.get('description'));
						saver.set('tags', link.get('tags'));
					}
					else alert('No link in base!');
					
				}, (error) => {
					alert('No link in base!');
				}
			);	
		}
	}
});




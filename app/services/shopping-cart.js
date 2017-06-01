import Ember from 'ember';

export default Ember.Service.extend({
	items: null,

	  init() {
		
	  },

	  add(item) {
		this.set('items', item);
	  },

	  remove(item) {
		this.get('items').removeObject(item);
	  },

	  empty() {
		this.get('items').setObjects([]);
	  }
});

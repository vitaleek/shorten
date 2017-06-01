import Ember from 'ember';

export default Ember.Controller.extend({
	fooBar: Ember.inject.service('foo-bar'),
	authManager: Ember.inject.service('session'),
	
	actions: {
		sendNewUrl(){
			//alert('address =  ' + this.get('newUrl'));
			var ad = this.get('newUrl');
			if (ad == undefined || ad == '') alert("Please, be careful with url-input field!");
			else {
				var desc = this.get('newDesc');
				var tags = this.get('newTag');
				
				var url = this.get('store').createRecord('url', {
				  address: ad,
				  shortLink:'',
				  description: desc,
				  date: new Date(),
				  stat: 0, 
				  user: this.get('fooBar').get('user'),
				  tags: {tag1: this.get('newTag1'),
						tag2: this.get('newTag2'),
						tag3: this.get('newTag3'),
						tag4: this.get('newTag4'),
						tag5: this.get('newTag5')
				  }
				}).save();
				this.set('newUrl', '');
				this.set('newDesc', '');
				this.set('newTag1', '');
				this.set('newTag2', '');
				this.set('newTag3', '');
				this.set('newTag4', '');
				this.set('newTag5', '');
				
				
				alert ('New link has been created successfully');
				this.transitionToRoute('surl.logon');
			}	
		 
		}
	}
});


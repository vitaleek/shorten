import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		
		sendNewUser(){
			//------------ INPUT CORRECTNESS VALIDATION ----------------
			var lg = this.get('newLogin');
			if (lg == undefined || lg == ''|| lg.length < 4) 
				alert('Please, be careful with LOGIN-input field! It MUST include 4 symbols at least');
			else {
				var np = this.get('newPass');
				var rp = this.get('rePass');
				
				if (!(np == rp) || np == '' || np == undefined || np.length < 4) 
					alert ('Your passwords do not match or incorrect! It MUST include 4 symbols at least');
				else {
					var nm = this.get('newMail');
					
					if (nm == undefined || nm == '' || nm.length < 4 || ( nm.indexOf("@") < 0) || ( nm.indexOf(".") < 0)) 
						alert('Please, be careful with EMAIL-input field!');
					else {
						// ----------- CHECK IF LOGIN IN BASE OR NOT -------------------------
						var self = this;
						this.get('store').queryRecord('user', {
								  filter: {
									login: lg
								  }
							  }).then(function(user) {
							  //alert("In function: " + user.get('login'));
							  
							  if (user.get('login')== lg ) alert('This username is already IN BASE, choose other one');
							  else {
								  // ---------- CREATING NEW RECORD ---------------------------
								  self.get('store').createRecord('user', {
										login: lg,
										password: np,
										email: nm
									}).save().then(() => {
											
											self.set('newLogin', '');
											self.set('newPass', '');
											self.set('rePass', '');
											self.set('newMail', '');
											alert ('New user has been registered successfully');
											self.transitionToRoute('surl.login');
										}, (err) => {
											alert('Something WRONG :'+err);
										}
									);
								  
								}
							});
					}

				}
					
			}	
		 
		}
	}
});

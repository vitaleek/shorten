var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var i = 0;

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://localhost/data/db/');
//mongoose.connect('mongodb://localhost/emberData');


var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});
var userSchema = new mongoose.Schema({
	
	login: 'string',
	password: 'string',
	email: 'string'
});

var urlSchema = new mongoose.Schema({
	address: 'string',
	shortLink: 'string',
	description: 'string',
	date : 'Date',
	stat: 'number',
	user: 'string',
	tags: {tag1: 'string', tag2: 'string', tag3: 'string', tag4: 'string', tag5: 'string'}
});
var NoteModel = mongoose.model('note',noteSchema);
var UrlModel = mongoose.model('url', urlSchema);
var UserModel = mongoose.model('user', userSchema);

app.listen('4500');

// ----------------------------- MAINETANCE REQUEST -----------------------
// ------------------------------- GET /  '/api/' -------------------------
app.get('/api/',function(req,res) {
	res.send('Working');
});

// ----------------------------- MAINETANCE REQUEST -----------------------
// ------------------------------- GET NOTES '/api/notes' -----------------
app.get('/api/notes', function(req,res) {
	NoteModel.find({},function(err,docs) {
		if(err) {
			res.send({error:err});
		}
		else {
			res.send({note:docs});
		}
	});
});
// ----------------------------- MAINETANCE REQUEST -----------------------
// ------------------------------- GET NOTES '/api/remove' ----------------
app.get('/api/remove', function(req,res) {

	UrlModel.findOneAndRemove({_id:"59137206328e3b0f9ce0d5d7"}, function (err) {
	  if (err) throw err;
	  // we have deleted the user
	  console.log('URL GET \'/api/remove\': RECORD DELETED');
	});
});

//----------------- URL POST '/api/urls' -----------------------  

app.post('/api/urls', function(req,res) {
	
	if (req.body.url.shortLink == '') { 						// SHORTER.CONTROLLER => CREATE NEW LINK
		var newU = new UrlModel({ 
					address: req.body.url.address, 
					shortLink: generate(), 
					description: req.body.url.description, 
					date: new Date(), 
					stat: 0, 
					user: req.body.url.user,
					tags: {
						tag1 : (req.body.url.tags.tag1) ? req.body.url.tags.tag1 : '',
						tag2 : (req.body.url.tags.tag2) ? req.body.url.tags.tag2 : '',
						tag3 : (req.body.url.tags.tag3) ? req.body.url.tags.tag3 : '',
						tag4 : (req.body.url.tags.tag4) ? req.body.url.tags.tag4 : '',
						tag5 : (req.body.url.tags.tag5) ? req.body.url.tags.tag5 : ''
					} 
		}); 
		newU.save(function (err) { 
			if (err) res.send(err.Text);
		});
		console.log('URL POST \'/api/urls\': CREATED NEW LINK');
	}
	else {														// STATISTICS.CONTROLLER => UPDATE existing LINK
		
		UrlModel.findOneAndUpdate({shortLink: req.body.url.shortLink}, 
			{
				address: req.body.url.address, 
				shortLink: req.body.url.shortLink, 
				description: req.body.url.description, 
				date: req.body.url.date, 
				stat: req.body.url.stat, 
				user: req.body.url.user, 
				tags: {
						tag1 : (req.body.url.tags.tag1) ? req.body.url.tags.tag1 : '',
						tag2 : (req.body.url.tags.tag2) ? req.body.url.tags.tag2 : '',
						tag3 : (req.body.url.tags.tag3) ? req.body.url.tags.tag3 : '',
						tag4 : (req.body.url.tags.tag4) ? req.body.url.tags.tag4 : '',
						tag5 : (req.body.url.tags.tag5) ? req.body.url.tags.tag5 : ''
					}  
				}, function(err, urla) {
		  if (err) throw err;
		  console.log(urla);
		  console.log('UPD: '+ urla.shortLink + ' ' + urla.description);
		});
		
		console.log('URL POST \'/api/urls\': LINK UPDATED');
	}
	
});  

// -------------- Generation of random link ------------------------
function generate(){
	var source = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var shortLink = source[Math.floor(Math.random() * source.length)];
	for (var i = 0; i < 7; i++){
		shortLink += source[Math.floor(Math.random() * source.length)];
	}
	shortLink = "http://sahar.uk/" + shortLink;
	return shortLink;
}

app.use(bodyParser.urlencoded({ extended: true }));


// ----------------- URL GET '/api/urls' ------------------------------------
app.get('/api/urls', function(req,res) {

	if (!req.body.url) {
		if (!req.query.filter) {
			console.log('Request.body: ' + req.body);
			UrlModel.find({}, function(err, urls) {
			  if (err) throw err;
			  else {
					res.send({urls});
				}
			  console.log('Require data ПРЫВЕТ  '+ i++);
			});
			
		}
		else {											
			if (req.query.filter.user){					// STATISTICS.ROUTE => GET LIST LINK BY USER FILTER => sending found url array
				UrlModel.find({user: req.query.filter.user}, function(err, urls) {
					if (err) throw err;
					else {
						res.send({urls});
						console.log('URL GET \'/api/urls\': FILTERED BY USER LINK LIST SENT ');
					}
				});
			}
			if (req.query.filter.shortLink){			// STATISTICS.ROUTE => GET LIST LINK BY shortLink FILTER => sending found url array
				UrlModel.find({shortLink: req.query.filter.shortLink}, function(err, url) {
					if (err) throw err;
					else {
						if (url.length != 0) {
							res.status(200).send({url:url[0]});
							console.log('URL GET \'/api/urls\': FILTERED BY SHORTLINKLINK LIST SENT');
						}
						else {
							res.status(400).send( {error: "NO LINK IN BASE!"});
							console.log('URL GET \'/api/urls\': NO LINK IN BASE');
						}
					}
				});
			}
		}	
	}
});

//---------------------- USER POST '/api/users' -----------------------------

app.post('/api/users', function (req, res) {
	var lg = req.body.user.login;
	//console.log('Login : ' + lg);
	
	UserModel.find({login: lg}, function(err, user) {
		if (err) throw err;
			if (user.length == 0) {						// REGISTER.CONTROLLER => CREATE NEW USER => sending CREATED user
				var newUser = new UserModel({ 
					login: req.body.user.login, 
					password: req.body.user.password, 
					email: req.body.user.email 
				}); 
				newUser.save(function (err) {
					if (err) res.send(err.Text);
				});
				res.send({user: newUser});
				console.log('USER POST \'/api/users\': NEW USER CREATED');
			}
			else {
				//res.send({user});
				console.log('CASE 2');
			}
	});
});

//---------------------- USER GET '/api/users' -----------------------------

app.get('/api/users', function (req, res) {
	if (!req.query.filter) {
		UserModel.find({}, function(err, users) {
			if (users[0]) {
				res.send({user: users});				// REGISTER.ROUTE (model) findAll('user')
				console.log('USER GET \'/api/users\': ALL USERS SENT');
			}
		});
	} 
	else {
		  UserModel.find({login:req.query.filter.login}, function(err, user) {
			  if (user.length == 0) {					// REGISTER.CONTROLLER queryRecord('user', filter: {user})
					var newUser = new UserModel({ 		// REGISTER.CONTROLLER => NO user IN BASE => sending DUMMY user
						login: 'nothing', 
						password: 'nothing', 
						email: 'nothing' 
					}); 
					res.status(200).send({user:newUser});
					console.log('USER GET \'/api/users\': NO IN BASE DUMMY USER SENT');
				}
				else {									// REGISTER.CONTROLLER queryRecord('user', filter: {user})
					res.status(200).send({user:user[0]});// REGISTER.CONTROLLER => FOUND user IN BASE => sending FOUND user
					console.log('USER GET \'/api/users\': ALREADY IN BASE');
				}
		});
	}
});
//--------------------------- MAINETANCE REQUEST ----------------------------------
//---------------------- USER GET '/api/users/:login' -----------------------------

app.get('/api/users/:log', function (req, res) {
	var log = req.params.log;
	  UserModel.find({user:'123'}, function(err, user) {
		  if (!user[0]) {	
				
				console.log('No user found!');
			}
			else {
				
				res.send({user});
				console.log('User in base: '+ user.login);
			}
	});
});

// ----------------------------- MAINETANCE REQUEST -----------------------	
// -------------------------------- GET '/token' -----------------------
var autenticated = false;
  
  // Ответ на запрос ключа
app.post('/token', function(req, res) {
    
	UserModel.find({login:req.body.username}, function(err, user) {
		if (err) throw err;
				
		if (user.length == 0) { 									// USER NOT FOUND IN BASE
			res.status(400).send({error: "UNKNOWN_USERNAME"});
			console.log('UNKNOWN_USERNAME');
		}
		
		else {
			if (req.body.password != user[0].password) {
				res.status(400).send({error: "WRONG_PASSWORD"});	// WRONG PASSWORD
				console.log('WRONG_PASSWORD'); 
			}
			else {
				res.status(200).send({ access_token: "some bs" }); 	// AUTORIZATION SUCCESSFUL
				console.log('OK');
			}
		}
	});
});
  
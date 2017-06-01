const bodyParser = require('body-parser');

var autenticated = false;
module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Ответ на запрос ключа
  app.post('/token', function(req, res) {
    if (req.body.username == 'login' && req.body.password == 'ok') {
      this.authenticated = true;
	  res.send({ access_token: "some bs" });
    } else {
      res.status(400).send({ error: "invalid_grant" });
    }
  });
  

};



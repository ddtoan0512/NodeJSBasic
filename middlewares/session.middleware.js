var shortid = require('shortid');
var Session = require('../models/session.model');
module.exports = function(req, res, next){

    var sessionId = req.signedCookies.sessionId;
  
    if (!sessionId) {
  
      var session = new Session;
      session.save();
      var sessionId = session._id;
  
      res.cookie('sessionId', sessionId, {
        signed: true
      });
    }
    next();  
}
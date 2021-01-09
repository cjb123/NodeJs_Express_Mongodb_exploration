var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user_passport')

exports.local = passport.use(new LocalStrategy(User.authenticate())) //localstrategy uses VerifyStrategy which uses username 
//and password that it extrats from incoming req(body of req using bodyParser)
// passort mongoose plugin implements this authenticate() function which provides authentication for the LocalStrategy.
passport.serializeUser(User.serializeUser()) //authenticate() will mount the req.user to request message.That user message will be serialized and deserialized
passport.deserializeUser(User.deserializeUser())// These will take care of support for sessions in passport.

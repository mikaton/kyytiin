const passport = require('passport'),
	express = require('express'),
	config = require('./main');
	JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	model = require('../models/index'),
	User = model.Customer;

const jwtOpts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwt_secret
}

const jwtLogin = new JwtStrategy(jwtOpts, (payload, done) => {
	console.log(payload);
	User.findOne({
		where: { customer_id: payload._id }
	})
		.then((user) => {
			if (user) { done(null, user); }
			else { done(null, false); }
		})
		.catch((err) => {
			console.log('jwtLogin failed: ' + err);
			done(false, err);
		});
});

passport.use(jwtLogin);
const passport = require('passport'),
	express = require('express'),
	config = require('./main');
	JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt'),
	localOpts = { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
	model = require('../models/index'),
	User = model.Customer;


const localLogin = new LocalStrategy(localOpts, (req, email, password, done) => {
	const checkPassword = function (candidatePassword, password) {
		return bcrypt.compareSync(candidatePassword, password)
	};

	User.findOne({
		where: { email: email }
	})
		.then((user) => {
			if (!user) return done(null, false, { message: 'User not found' });
			if (!checkPassword(password, user.password)) {
				return done(null, false, { message: 'Passwords do not match' });
			} else {
				let userInfo = user.get();
				return done(null, userInfo);
			}

		})
		.catch((err) => {
			console.log('localLogin failed: ' + err.message);
			return done(false, err);
		});
});

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
passport.use(localLogin);
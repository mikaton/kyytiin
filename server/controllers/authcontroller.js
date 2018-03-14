const model = require('../models/index'),
	bcrypt = require('bcrypt'),
	path = require('path'),
	crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	config = require('../config/main'),
	async = require('async'),
	User = model.Customer,

	// --- <Sähköpostin asetukset> ---
	hbs = require('nodemailer-express-handlebars'),
		email = process.env.MAILER_EMAIL_ID || config.mailer.user,
		password = process.env.MAILER_PASSWORD || config.mailer.password,
	nodemailer = require('nodemailer'),

	smtpTransport = nodemailer.createTransport({
		service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
		auth: {
			user: email,
			pass: password
		}
	}),

	handlebarsOptions = {
		viewEngine: 'handlebars',
		viewPath: path.resolve('./server/templates/'),
		extName: '.html'
	};

	smtpTransport.use('compile', hbs(handlebarsOptions));
	// --- </Sähköpostin asetukset> //

function generateJwt(user) {
	return jwt.sign(user, config.jwt_secret);
};

function setUserInfo(request) {
	return {
		_id: request.customer_id,
		email: request.email
	}
};

exports.localRegister = (req, res, next) => {
	const hashPassword = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
	};

	let firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email.confEmail,
		password = req.body.password.pwd,
		phoneNumber = req.body.phoneNumber;

	User.findOne({
		where: { email: email }
	})
		.then((user) => {
			if (user) {
				res.status(400).json({
					message: 'User already exists'
				});
			}
			else {
				let userPassword = hashPassword(password);

				const data = {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: userPassword,
					phoneNumber: phoneNumber
				};
				User.create(data)
					.then((newUser) => {
						const userInfo = setUserInfo(newUser);
						if (newUser) res.status(200).json({
							message: 'User created',
							user: userInfo,
							token: generateJwt(userInfo)
						});
					});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.socialRegister = (req, res, next) => {
	let social_id = req.body.id,
		social_token = req.body.authToken,
		social_provider = req.body.provider,
		social_photourl = req.body.photoUrl,
		firstName = req.body.firstName,
		// RUMA HÄKKI! Tulee aiheuttamaan ongelmia jos nimessä on enemmän osia
		gFirstName = req.body.name.split(' ')[0];
		gLastName = req.body.name.split(' ')[1];
		lastName = req.body.lastName,
		email = req.body.email,
		data = {};

	User.findOne({
		where: { email: email }
	}).then((user) => {
		// Jos löytyy käyttäjä samalla emaililla, tarkistetaan social_id
		// jos social_id on sama, siirrytään kirjautumisreittiin
		if (user) {
			if (user.social_id === social_id) {
				next();
			} else {
				// Jos email löytyy, mutta social_id ei ole sama, päivitetään social data
				const updateData = {
					social_id: social_id,
					social_token: social_token,
					social_provider: social_provider,
					social_photourl: social_photourl
				};
				user.updateAttributes(updateData).then((updatedUser) => {
					let user = setUserInfo(updatedUser.dataValues);
					return res.status(200).json({
						message: 'User updated',
						user: user,
						token: generateJwt(user)
					});
				})
					.catch((err) => {
						console.log(err);
					});
			}
		}
		if (!user) {
			if(social_provider === 'GOOGLE') {
				data = {
					social_id: social_id,
					social_token: social_token,
					social_provider: social_provider,
					social_photourl: social_photourl,
					firstName: gFirstName,
					lastName: gLastName,
					email: email,
				}
			} else {
				data = {
					social_id: social_id,
					social_token: social_token,
					social_provider: social_provider,
					social_photourl: social_photourl,
					firstName: firstName,
					lastName: lastName,
					email: email,
				};
			}

			User.create(data)
				.then((newUser) => {
					const userInfo = setUserInfo(newUser);
					console.log(newUser);
					console.log(userInfo);
					if (newUser) res.status(200).json({
						message: 'User created',
						token: generateJwt(userInfo)
					});
				});
		}
	});
};

exports.localLogin = (req, res, next) => {
	const userInfo = setUserInfo(req.user);
	res.status(200).json({
		message: 'Successfully logged in',
		token: generateJwt(userInfo),
		_id: userInfo._id
	});
};

exports.socialLogin = (req, res, next) => {
	let email = req.body.email;
	User.findOne({
		where: { email: email }
	})
		.then((user) => {
			const userInfo = {
				_id: user.customer_id,
				email: user.email
			}
			console.log(userInfo);
			res.status(200).json({
				message: 'Successfully logged in',
				token: generateJwt(userInfo),
				_id: user.customer_id
			});
		});
};

exports.forgotPassword = (req, res, next) => {
	// waterfall ajaa funktiot esitellyssä järjestyksessä
	// edellisen funktion tuotos "tiputetaan" seuraavalle funktiolle
	async.waterfall([
		function(done) {
			User.find({
				where: { email: req.body.email }
			})
			.then((user, err) => {
				if(user) {
					done(err, user);
				} else {
					done('User not found');
				}
			});
		},
		function(user, done) {
			// Luodaan reset token
			crypto.randomBytes(20, function(err, buffer) {
				const token = buffer.toString('hex');
				console.log('token: ' + token);
				done(err, user, token);
			});
		},
		function(user, token, done) {
			// Etsitään käyttäjä ja lisätään token kantaan, sekä asetetaan expiry tunnin päähän
			User.findOne({
				where: { customer_id: user.customer_id }
			})
			.then((user) => {
				const data = {
					reset_token: token,
					reset_token_expiry: Date.now() + 3600000
				};
	
				user.updateAttributes(data).then((newUser, err) => {
						done(err, token, newUser.dataValues);
				});
			});
		},
		function(token, user, done) {
			// Sähköpostin tiedot. Template löytyy kansiosta templates sen nimellä
			const data = {
				to: user.email,
				from: email,
				template: 'forgot-password',
				subject: 'Kyyti.in salasanan nollaus',
				context: {
					url: 'https://kyyti.in/change_password/' + token,
					name: user.firstName
				}
			};
			console.log(data);
			// Lähetetään sähköposti
			smtpTransport.sendMail(data, function(err) {
				if(!err) {
					return res.status(201).json({ success: true, message: 'Reset email sent'});
				} else {
					return done(err);
				}
			});
		}
	], function(err) {
		// Jos waterfallissa tapahtui virhe
		return res.status(500).json({ success: false, message: err});
	})
}
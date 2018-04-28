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
	email = config.mailer.user,
	password = config.mailer.password,
	nodemailer = require('nodemailer'),

	smtpTransport = nodemailer.createTransport({
		service: process.env.MAILER_SERVICE_PROVIDER,
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

const checkPassword = function (candidatePassword, password) {
	return bcrypt.compareSync(candidatePassword, password)
};

function hashPassword(password) {
	return bcrypt.hashSync(password, 10, null);
};

exports.localRegister = (req, res, next) => {
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
					message: 'Sähköposti on jo rekisteröity käyttäjälle.'
				});
			}
			else {
				let userPassword = hashPassword(password);

				const data = {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: userPassword,
					phoneNumber: phoneNumber,
					confirm_token: crypto.randomBytes(20).toString('hex'),
					confirm_token_expiry: Date.now() + 2592000000
				};

				User.create(data)
					.then((newUser) => {
						// Luodaan sähköposti
						const emailData = {
							to: newUser.email,
							from: email,
							template: 'verify-account',
							subject: 'Vahvista Kyyti.in -tunnuksesi',
							context: {
								url: 'https://app.kyyti.in/verify-account/' + newUser.confirm_token,
								name: newUser.firstName
							}
						};
						// lähetetään sähköpost
						smtpTransport.sendMail(emailData, () => {
							return res.status(201).json({ success: true, message: 'Vahvistussähköposti lähetetty' });
						});

						// Luodaan käyttäjälle JWT
						const userInfo = setUserInfo(newUser);
						if (newUser) {
							res.status(201).json({
								message: 'Käyttäjä luotu',
								user: userInfo,
								token: generateJwt(userInfo)
							});
						} 
					});
			}
		})
		.catch((err) => {
			console.error('localRegister epäonnistui: ' + err.stack);
		});
};

exports.verifyEmail = (req, res, next) => {
	// Etsitään käyttäjä jonka confirm_token on voimassa
	console.log('täällä!')
	console.log(req.params);
	User.findOne({
		where: { confirm_token: req.params.token, confirm_token_expiry: { $gt: Date.now() } }
	})
	.then((user) => {
		const data = { confirmed: true };
		return user.updateAttributes(data).then(() => {
		}).catch((err) => console.error('Käyttätunnuksen vahvistaminen epäonnistui: ' + err.stack));
	}).catch((err) => console.error('Käyttäjätunnuksen hakeminen vahvistamista varten epäonnistui: ' + err.stack));
};

exports.localLogin = (req, res, next) => {
	User.findOne({
		where: { email: req.body.email }
	})
	.then((user) => {
		if (!user) return res.status(404).json({ success: false, message: 'Käyttäjää ei löytynyt' });
		if (!checkPassword(req.body.password, user.dataValues.password)) return res.status(401).json({ success: false, message: 'Salasanat eivät täsmää' });
		if(!user.dataValues.confirmed) return res.status(403).json({ success: false, message: 'Vahvista sähköpostiosoitteesi kirjautuaksesi sisään' });

		const userInfo = setUserInfo(user.dataValues);
		res.status(200).json({
			message: 'Successfully logged in',
			token: generateJwt(userInfo),
			_id: userInfo._id
		});
	})
	.catch((err) => {
		console.log('localLogin failed: ' + err.stack);
	});
	
};

exports.socialRegister = (req, res, next) => {
	let social_id = req.body.id,
		social_provider = req.body.provider,
		social_photourl = req.body.photoUrl,
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		// RUMA HÄKKI! Tulee aiheuttamaan ongelmia jos nimessä on enemmän osia
		gFirstName = req.body.name.split(' ')[0],
		gLastName = req.body.name.split(' ')[1],
		email = req.body.email,
		data = {};

	User.findOne({
		where: { email: email }
	})
	.then((user) => {
		// Jos löytyy käyttäjä samalla emaililla, tarkistetaan social_id
		// jos social_id on sama, siirrytään kirjautumisreittiin
		if (user) {
			if (user.social_id === social_id) {
				next();
			} else {
				// Jos email löytyy, mutta social_id ei ole sama, päivitetään social data
				const updateData = {
					social_id: social_id,
					social_provider: social_provider,
					social_photourl: social_photourl
				};
				user.updateAttributes(updateData).then((updatedUser) => {
					let user = setUserInfo(updatedUser.dataValues);
					return res.status(200).json({
						message: 'Käyttäjä päivitetty',
						user: user,
						token: generateJwt(user)
					});
				});
			}
		}
		if (!user) {
			if (social_provider === 'GOOGLE') {
				data = {
					social_id: social_id,
					social_provider: social_provider,
					social_photourl: social_photourl,
					firstName: gFirstName,
					lastName: gLastName,
					email: email,
				}
			} else {
				data = {
					social_id: social_id,
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
					if (newUser) res.status(201).json({
						message: 'Käyttäjä luotu',
						_id: newUser.customer_id,
						token: generateJwt(userInfo)
					});
				});
		}
	})
	.catch((err) => console.log('socialRegister failed: ' + err.message));
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
		res.status(200).json({
			message: 'Successfully logged in',
			token: generateJwt(userInfo),
			_id: user.customer_id
		});
	})
	.catch((err) => console.log('socialLogin failed: ' + err.message));
};

exports.forgotPassword = (req, res, next) => {
	// waterfall ajaa funktiot esitellyssä järjestyksessä
	// edellisen funktion tuotos "tiputetaan" seuraavalle funktiolle
	async.waterfall([
		function (done) {
			User.find({
				where: { email: req.body.email }
			})
				.then((user, err) => {
					if (user) {
						done(err, user);
					} else {
						done('Käyttäjää ei löydetty');
					}
				});
		},
		function (user, done) {
			// Luodaan reset token
			crypto.randomBytes(20, function (err, buffer) {
				const token = buffer.toString('hex');
				done(err, user, token);
			});
		},
		function (user, token, done) {
			// Etsitään käyttäjä ja lisätään token kantaan, sekä asetetaan expiry tunnin päähän
			User.findOne({
				where: { customer_id: user.customer_id }
			})
			.then((user) => {
				const data = {
					reset_token: token,
					reset_token_expiry: Date.now() + 3600000
				};
				user.updateAttributes(data).then((updatedUser, err) => {
					done(err, token, updatedUser.dataValues);
				});
			});
		},
		function (token, user, done) {
			// Sähköpostin tiedot. Template löytyy kansiosta templates sen nimellä
			const data = {
				to: user.email,
				from: email,
				template: 'forgot-password',
				subject: 'Kyyti.in salasanan nollaus',
				context: {
					url: 'https://app.kyyti.in/change-password/' + token,
					name: user.firstName
				}
			};
			// Lähetetään sähköposti
			smtpTransport.sendMail(data, function (err) {
				if (!err) {
					return res.status(201).json({ success: true, message: 'Reset sähköposti lähetetty' });
				} else {
					return done(err);
				}
			});
		}
	], function (err) {
		// Jos waterfallissa tapahtui virhe
		return res.status(500).json({ success: false, message: 'async.waterfall error', err: err });
	})
};

exports.changePassword = (req, res, next) => {
	// Tarkistetaan että token on olemassa & voimassa
	User.findOne({
		where: { reset_token: req.body.token, reset_token_expiry: { $gt: Date.now() } }
	})
	.then((user) => {
		if (user) {
			const data = {
				password: hashPassword(req.body.newPassword.password.pwd),
				reset_token: undefined,
				reset_token_expiry: undefined
			};
			user.updateAttributes(data).then((user) => {
				const data = {
					to: user.dataValues.email,
					from: email,
					template: 'password-change-confirm',
					subject: 'Kyyti.in salasana vaihdettu',
					context: {
						name: user.dataValues.firstName
					}
				};
				smtpTransport.sendMail(data, () => {
					return res.status(200).json({
						success: true,
						message: 'Salasanan vaihto onnistui'
					});
				});
			});
		} else {
				return res.status(400).json({
					success: false,
					message: 'Invalidi tai vanha tokeni'
				});
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				message: 'Salasanan vaihto epäonnistui:',
				error: err
			});
		});
};
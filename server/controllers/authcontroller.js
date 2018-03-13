const model = require('../models/index'),
	bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken'),
	config = require('../config/main'),
	User = model.Customer;

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


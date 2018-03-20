const model = require('../models/index'),
	Review = model.Review;

exports.canReview = (req, res, next) => {
	//Jos palauttaa arvoja, kyydin luoja voi arvostella kyytiläisiä
	Review.sequelize.query('SELECT r.ride_id, r.customer_id AS creator_customer_id, CRr.customer_id AS joiner_customer_id FROM Rides r INNER JOIN CustomersRides_ride CRr ON r.ride_id = CRr.ride_id WHERE r.customer_id = :creator_customer_id AND CRr.customer_id = :joiner_customer_id',
		{
			replacements: { creator_customer_id: req.params.creator_customer_id, joiner_customer_id: req.params.joiner_customer_id },
			type: Review.sequelize.QueryTypes.SELECT
		})
		.then(data => {
			//Jos edellinen query ei palauttanut mitään, mennään seuraavaan ja etsitää sieltä
			if (data.length === 0) {
				console.log('query1, 403')
				//Jos query palauttaa arvoja, kyytiläinen voi arvostella luojaa
				Review.sequelize.query('SELECT CRr.ride_id, CRr.customer_id AS joiner_customer_id, r.customer_id AS creator_customer_id FROM CustomersRides_ride CRr INNER JOIN Rides r on CRr.ride_id = r.ride_id WHERE r.customer_id = :creator_customer_id AND CRr.customer_id = :joiner_customer_id',
					{
						replacements: { creator_customer_id: req.params.joiner_customer_id, joiner_customer_id: req.params.creator_customer_id },
						type: Review.sequelize.QueryTypes.SELECT
					})
					.then(data2 => {
						console.log(data2);
						if (data2.length === 0) {
							console.log('query2 403')
							res.status(403).json({
								message: 'You are not able to review'
							})
						} else {
							console.log('query2 200')
							res.status(200).json({
								message: 'Proceed'
							});
						}
					})
					.catch(err => console.log(err));
			} else {
				console.log('query1 200')
				res.status(200).json({
					message: 'Proceed'
				});
			}
		})
		.catch(err => console.log(err))
};

exports.getReview = (req, res, next) => {
	Review.findAll({
		where: { customer_id: req.params.id }
	}).then(review => {
		if (!review) res.status(400).json({
			message: 'Review not found'
		});
		else res.status(200).json({
			message: 'Review found',
			review: review
		});
	})
		.catch((err) => {
			console.log(err)
		})
};
exports.createReview = (req, res, next) => {
	const data = {
		customer_id: req.body.customer_id,
		review_text: req.body.review_text,
		stars: req.body.stars,
	};
	console.log(data);

	Review.create(data)
		.then((ride) => {
			res.status(200).json({
				message: 'Review created',
				data: data
			});
		})
		.catch((err) => {
			console.log(err)
		})
};

exports.deleteReview = (req, res, next) => {
	Review.find({
		where: { Review_id: req.params.id }
	})
		.then((review) => {
			return review.destroy();
		})
		.then(() => {
			res.status(200).json({
				message: 'Review deleted'
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const model = require('../models/index'),
      Review = model.Review;

exports.getReview = (req, res, next) => {
  Review.find({
    where: { customer_id: req.params.id }
  }).then(user => {
    if(!user) res.status(400).json({
      message: 'User not found'
    });
    else res.status(200).json({
      message: 'User found',
      user: user
    });
  });
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
		  data: review
		});
	  })
	  .catch((err) => {
		console.log(err)
	  })
  };

exports.deleteReview = (req, res, next) => {
  Review.find({
    where: {Review_id: req.params.id}
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
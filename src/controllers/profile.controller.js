const httpStatus = require('http-status');
const User = require('../models/user.model');
const { updateProfileSchema } = require('../validation/profile.validation');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching profile'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: error.details[0].message
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          'profile.bio': req.body.profile?.bio,
          'profile.socialLinks': req.body.profile?.socialLinks
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error updating profile'
    });
  }
};
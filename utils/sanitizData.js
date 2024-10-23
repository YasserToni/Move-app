exports.sanitizeUser = function (user) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    active: user.active,
    bio: user.bio,
    profileImage: user.profileImage,
    favorites: user.favorites,
  };
};

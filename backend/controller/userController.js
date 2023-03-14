const User =  require("../models/userModel");

//READ DATA
// Get a user by ID
const getUser = async (req, res) => {
  const { id } = req.params; // extract user ID from request parameters
  const user = await User.findById(id); // find user in database using ID

  if (!user) {
    return res.status(404).json({ message: "User not found" }); // if user not found, return 404 status code with error message
  }

  res.status(200).json(user); // if user found, return user data in JSON format
};

//GET FRIENDS
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = friends.map(
      ({_id,firstName, lastName, occupation, location, picturePath}) => {
        return {_id, firstName, lastName, occupation, location, picturePath}
    })
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 //UPDATE DATA
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Find the current user and friend in the database
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Determine whether the friend is already in the user's friends list
    const friendIndex = user.friends.indexOf(friendId);

    // Update the friends lists based on whether the friend is already present
    if (friendIndex >= 0) {
      user.friends.splice(friendIndex, 1);
      friend.friends.splice(friend.friends.indexOf(id), 1);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the updated friends lists to the database
    await Promise.all([user.save(), friend.save()]);

    // Retrieve the updated friends list for the user
    const updatedUser = await User.findById(id).populate('friends', 'firstName lastName occupation location picturePath');

    // Format the updated friends list and return it in the response
    const formattedFriends = updatedUser.friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  module.exports = {getUser,getUserFriends,addRemoveFriend};


import User from "../models/User.js";

//api end point
export const getUser = async (req, res) => {
  try {
    //if u can find uder from ther user
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);//success
  } catch (err) {
    res.status(404).json({ message: err.message });//failure
  }
};

//get a certain users friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    //promise object
    //grab each id a user had
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    //grab information from the friend ids
    //setting up json to send back to frontend
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//when someone adds or removes a friend
export const addRemoveFriend = async (req, res) => {
  try {
    //get the user id and the friend id they have
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    //if they already have them as a friend that means 
    //you must remove the friend as ther users friend in
    //the database
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
        //add the friend to the users friends list
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    //waiting till it is saved in database
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
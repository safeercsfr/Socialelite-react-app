import User from "../models/User.js";
import bcrypt from "bcrypt";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followingCount = await User.countDocuments({
      "friends.followers": id,
    });
    const followersCount = await User.countDocuments({
      "friends.following": id,
    });

    res.status(200).json({
      user,
      followingCount: followingCount,
      followersCount: followersCount,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const followingCount = await User.countDocuments({
      "friends.followers": id,
    });
    const followersCount = await User.countDocuments({
      "friends.following": id,
    });
    res
      .status(200)
      .json({ followingCount: followingCount, followersCount: followersCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getSuggestionUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(id);
    const following = currentUser.friends.map((friend) => friend.following);
    const user = await User.find({ _id: { $nin: [following, id] } });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(id);
    const friends = await Promise.all(
      currentUser.friends.map(({ following }) => User.findById(following))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.some((friend) => friend.following === friendId)) {
      user.friends = user.friends.filter(
        ({ following }) => following !== friendId
      );
      friend.friends = friend.friends.filter(
        ({ followers }) => followers !== id
      );
    } else {
      user.friends.push({ following: friendId });
      friend.friends.push({ followers: id });
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map(({ following }) => User.findById(following))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      location,
      occupation,
      oldPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    let user = await User.findById(id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.location = location || user.location;
      user.occupation = occupation || user.occupation;
      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch)
          return res.status(400).json({ error: "Invalid Old Password. " });

        if (newPassword == confirmPassword) {
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(confirmPassword, salt);
          user.password = passwordHash;
        } else {
          return res
            .status(400)
            .json({ error: "Old password not same to new password" });
        }
      }

      const updatedUser = await user.save(); // Save the changes to the user object
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(404).json({ error: "Email Already Exists!" });
  }
};

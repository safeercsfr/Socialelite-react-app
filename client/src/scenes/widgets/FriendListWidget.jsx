import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/authSlice";
import { getDataAPI } from "utils/fetchData";

const FriendListWidget = ({ userId, isSuggestion }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const medium = palette.neutral.medium;
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const getFriends = async () => {
    try {
      // CALLING FOLLOWING LIST
      const { data } = await getDataAPI(`/users/${userId}/friends`, token);
      dispatch(setFriends({ friends: data }));

      // CALLING SUGGESTION LIST 
      const { data: suggestions } = await getDataAPI(`/users/${user._id}/suggestions`,token);
      setUsers(suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper style={{ position: "sticky", top: "7.3rem" }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {isSuggestion ? "Suggestion List" : "Following List"}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {isSuggestion
          ?users.length === 0 ? <Typography color={medium} m="0.5rem 0">No suggestions found.</Typography>: users.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
                isFriendData
              />
            ))
          : friends.length === 0 ? <Typography color={medium} m="0.5rem 0">You are following no one yet.</Typography>: friends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
                isFriendData
              />
            ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/authSlice";
import { getDataAPI } from "utils/fetchData";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  console.log(friends);

  const getFriends = async () => {
    try {
      const {data} = await getDataAPI(`/users/${userId}/friends`,token)
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error)
    }
    // const response = await fetch(
    //   `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    // const data = await response.json();
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
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

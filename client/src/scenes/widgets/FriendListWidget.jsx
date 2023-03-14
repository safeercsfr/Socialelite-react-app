import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId,isFriendData=false }) => {
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends);

  // const getFriends = async () => {
  //   try {
  //     const {data} = await getDataAPI(`/users/${userId}/friends`,token)
  //     dispatch(setFriends({ friends: data }));
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  // useEffect(() => {
  //    getFriends();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper style={{ position: "sticky", top: "7.3rem" }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
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

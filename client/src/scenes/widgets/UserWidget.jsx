import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataAPI } from "utils/fetchData";
import { setFriends, setIsEditing, setUserData } from "state/authSlice";

const UserWidget = ({
  userId,
  picturePath,
  isEditUser,
  isFriendData,
  isProfile = false,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [friendData, setFriendData] = useState({});
  const [followers, setFollowers] = useState({});
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await getDataAPI(`/users/${userId}`, token);
      setFriendData(data);
      // dispatch(setUserData({user:data}))
    } catch (error) {
      console.error(error);
    }
  };

  const getFollowers = async () => {
    try {
      const { data } = await getDataAPI(`/users/${userId}/followers`, token);
      setFollowers(data);
      // setFriendData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getFollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let handleEditClick = () => {
    dispatch(setIsEditing({ isEditing: true }));
  };

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    // viewProfile,
    // impressions,
    // friends,
  } = user;

  return (
    <WidgetWrapper
    // style={isProfile ? {} : { position: "sticky", top: "7.3rem" }}
    >
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="0.5rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="0.5rem">
          <UserImage
            image={isFriendData ? friendData?.user?.picturePath : picturePath}
            isProfile={!isFriendData && isProfile}
          />
          <Box mb="1rem">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {isFriendData ? friendData?.user?.firstName : firstName}{" "}
              {isFriendData ? friendData?.user?.lastName : lastName}
            </Typography>
            {/* {isProfile && isFriendData ?<Button>Unfollow</Button> : <Button>Follow</Button>} */}
            {/* <Typography color={medium}>
              {isFriendData ? friendData?.user?.friends?.length : friends?.length}{" "}
              friends
            </Typography> */}
          </Box>
        </FlexBetween>
        {isEditUser && (
          <ManageAccountsOutlined
            style={{ cursor: "pointer" }}
            onClick={handleEditClick}
          />
        )}
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {isFriendData ? friendData?.user?.location : location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {isFriendData ? friendData?.user?.occupation : occupation}
          </Typography>
        </Box>
      </Box>
      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Following</Typography>
          <Typography color={main} fontWeight="500">
            {isFriendData
              ? friendData.followingCount
              : followers.followingCount}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Followers</Typography>
          <Typography color={main} fontWeight="500">
            {isFriendData
              ? friendData.followersCount
              : followers.followersCount}
          </Typography>
        </FlexBetween>
      </Box>
      {/* <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {isFriendData ? friendData?.viewProfile : viewProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {isFriendData ? friendData?.impressions : impressions}
          </Typography>
        </FlexBetween>
      </Box> */}

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
export default UserWidget;

import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { getDataAPI, putDataAPI } from "utils/fetchData";
import { setIsEditing } from "state/authSlice";
import UserEdit from "scenes/widgets/UserEdit";
import { toast, Toaster } from "react-hot-toast";
import { setUserData } from "state/authSlice";

const ProfilePage = () => {
  const isEditing = useSelector((state) => state.isEditing);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const { data } = await getDataAPI(`/users/${userId}`, token);
      dispatch(setUserData({ user: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const onSave = async (userDetails) => {
    try {
      console.log(userDetails,token,'lll');
      console.log('kkkkkkkkkkkk',userId);
      const { data } = await putDataAPI(`/users/${userId}`, userDetails, token);
      console.log('kkkkkkkkkkkk',data);
      dispatch(setUserData({ user: data }));
      dispatch(setIsEditing({ isEditing: false }));
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "bottom-center",
      });
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
            isEditUser={true}
            isProfile
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        {isEditing ? (
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <UserEdit
              user={user}
              onCancel={() => dispatch(setIsEditing({ isEditing: false }))}
              onSave={onSave}
            />
          </Box>
        ) : (
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        )}
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProfilePage;

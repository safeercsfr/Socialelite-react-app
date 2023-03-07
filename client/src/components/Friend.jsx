import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  Delete,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ConfirmToast } from "react-confirm-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state/authSlice";
import { deleteDataAPI, patchDataAPI } from "utils/fetchData";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    try {
      const { data } = await patchDataAPI(
        `/users/${_id}/${friendId}`,
        {},
        token
      );
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    const { data } = await deleteDataAPI(`/posts/${postId}`, token);
    dispatch(setPosts({ posts: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId === _id ? (
        <ConfirmToast
          asModal={false}
          customCancel={"Cancel"}
          customConfirm={"Confirm"}
          customFunction={deletePost}
          message={"Do you want to delete post?"}
          position={"bottom-left"}
          showCloseIcon={true}
          theme={"light"}
        >
          <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
            <Delete />
          </IconButton>
        </ConfirmToast>
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;

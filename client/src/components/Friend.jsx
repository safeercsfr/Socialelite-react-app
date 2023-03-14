
import { Box, Typography, useTheme, Button } from "@mui/material";
import { ConfirmToast } from "react-confirm-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state/authSlice";
import { deleteDataAPI, patchDataAPI } from "utils/fetchData";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  postId,
  isFriendData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend?._id === friendId);

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
      {!isFriendData && friendId === _id ? (
        <ConfirmToast
          asModal={true}
          customCancel={"Cancel"}
          customConfirm={"Confirm"}
          customFunction={deletePost}
          message={"Do you want to delete post?"}
          position={"bottom-left"}
          showCloseIcon={true}
          theme={"snow"}
        >
            <Button>Delete</Button>
        </ConfirmToast>
      ) : (
        <Box onClick={() => patchFriend()}>
          {isFriend ? <Button>Unfollow</Button> : <Button>Follow</Button>}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friend;

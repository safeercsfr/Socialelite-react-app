import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/authSlice";
import PostWidget from "./PostWidget";
import { getDataAPI } from "utils/fetchData";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const { data } = await getDataAPI("/posts", token);
      console.log(data);
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    }
  };
  const getUserPosts = async () => {
    try {
      const { data } = await getDataAPI(`/posts/${userId}/posts`, token);
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Only render posts if there are posts to display
  return (
    <>
      {posts.length > 0 &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              isProfile
            />
          )
        )}
    </>
  );
};

export default PostsWidget;

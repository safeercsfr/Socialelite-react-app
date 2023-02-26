import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setPosts({ posts: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${userId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setPosts({ posts: response.data, userId }));
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
            />
          )
        )}
    </>
  );
};

export default PostsWidget;

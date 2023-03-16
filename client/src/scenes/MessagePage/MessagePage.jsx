import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/Navbar";
import ChatList from "scenes/widgets/ChatList";

const MessagePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

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
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <UserSuggestion />
        </Box> */}
        
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <ChatList/>
            {/* <ChatBox/> */}
            <Box m="2rem 0" />
            {/* <PostsWidget userId={userId} isProfile /> */}
          </Box>
      </Box>
    </Box>
  );
};

export default MessagePage;

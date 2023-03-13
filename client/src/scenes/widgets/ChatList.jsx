import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
// import SocketContext from "../../utils/socket";
import ChatItem from "./ChatItem";
import WidgetWrapper from "components/WidgetWrapper";

const ChatList = () => {
  const [converstations, setConverstations] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  // const socket = useContext(SocketContext);

  useEffect(() => {
    // socket.current?.on("get_users", (users) => {
    //   console.log(users);
    // });
  }, []);

  useEffect(() => {
    // const getConverstations = async () => {
    //   try {
    //     const res = await axios.get(`api/converstation/${userId}`, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     setConverstations(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getConverstations();
  }, []);

  return (
    <WidgetWrapper>
    <Box flex={4}>
      {/* <Card
        sx={{
          height: "90vh",
          width: "98%",
        }}
      > */}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h1">
            Chats
          </Typography>
        </Box>
        <Box>
          <Box>
            <TextField
              sx={{
                marginInline: "2rem",
                width: "98%",
                backgroundColor: "transparent",
              }}
              id="standard-basic"
              placeholder="Find User"
              variant="standard"
            />
          </Box>
          <Box>
            <List
              dense
              sx={{
                bgcolor: "background.paper",
                maxHeight: "80vh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <ChatItem />
              {/* {converstations?.map((chat) => {
                return <ChatItem key={chat._id} chat={chat} />;
              })} */}
            </List>
          </Box>
        </Box>
      {/* </Card> */}
    </Box>
    </WidgetWrapper>
  );
};

export default ChatList;

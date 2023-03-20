import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.token);

  const getNotifications = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/notifications`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <WidgetWrapper>
      <Box flex={4}>
        <Box
          sx={{
            height: "80vh",
            width: "98%",
            border: "none",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h1">
              Notifications
            </Typography>
          </Box>
          <Box>
            <Box>
              <Box
                sx={{
                  width: "90%",
                  margin: "1rem",
                  maxHeight: "80vh",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {notifications.map((item, i) => {
                  return (
                    <>
                      <NotificationItem key={i} notification={item} />
                      <Divider />
                    </>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default Notifications;

import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const MessageWidget = () => {
  return (
    <WidgetWrapper>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            backgroundColor: "#F5F5F5",
          }}
          elevation={0}
        >
          <Avatar src="https://via.placeholder.com/48" />
          <Typography variant="h6">Username</Typography>
        </Paper>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            px: 2,
            py: 1,
          }}
        >
          {/* Chat messages */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                alignSelf: "flex-start",
                backgroundColor: "#E5E5EA",
                borderRadius: "10px",
                px: 2,
                py: 1,
                maxWidth: "70%",
              }}
            >
              <Typography variant="body1">Message 1</Typography>
            </Box>
            <Box
              sx={{
                alignSelf: "flex-end",
                backgroundColor: "#D6F4FF",
                borderRadius: "10px",
                px: 2,
                py: 1,
                maxWidth: "70%",
              }}
            >
              <Typography variant="body1">Message 2</Typography>
            </Box>
            {/* Add more messages here */}
          </Box>
        </Box>
        {/* Chat input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
          }}
        >
          <TextField
            placeholder="Type your message here..."
            sx={{
              flexGrow: 1,
              resize: "none",
              borderRadius: "20px",
              py: 1,
              minHeight: "40px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2962FF",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
          >
            SEND
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MessageWidget;

import { useTheme } from "@emotion/react";
import { EditOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { postDataAPI } from "utils/fetchData";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("email is required", {
        position: "bottom-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "bottom-center",
      });
    } else {
      const { data } = await postDataAPI(`/auth/sendpasswordlink`, { email });
      console.log(data);

      if (data.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("invalid user!");
      }
    }
  };

  return (
    <form>
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Socialelite
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
          }}
        >
          <WidgetWrapper>
            <Box p="1rem" sx={{ width: "30rem", alignItems: "center" }}>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Passowrd reset link send successfully in your Email
                </p>
              ) : (
                ""
              )}
              <Typography
                variant="h4"
                //   color={}
                fontWeight="500"
                mb="1rem"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <EditOutlined sx={{ mr: "0.5rem" }} />
                Reset Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box ml="1rem" display="flex" justifyContent="flex-end" mt="1rem">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendLink}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </WidgetWrapper>
        </Box>
      </Box>
      <Toaster />
    </form>
  );
};

export default PasswordReset;

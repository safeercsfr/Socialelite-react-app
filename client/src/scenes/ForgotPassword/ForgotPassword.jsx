import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDataAPI, postDataAPI } from "utils/fetchData";

export const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const userValid = async () => {
    try {
      const { data } = await getDataAPI(`/auth/forgotpassword/${id}/${token}`);
      if (data.status === 201) {
        console.log("user valid");
      } else {
        history("*");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("password is required", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("Password must have minimum 6 charactors");
    } else if (
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    } else {
      try {
        const { data } = await postDataAPI(`/auth/${id}/${token}`, {
          password,
        });
        if (data.status === 201) {
          setPassword("");
          setMessage(true);
        } else {
          toast.error("! Token expired generate new link", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                  Passowrd updated successfully
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
                {/* <EditOutlined sx={{ mr: "0.5rem" }} /> */}
                Enter Your New Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Enter new password"
                    type="password"
                    value={password}
                    onChange={setval}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt="1rem"
                sx={{
                  button: {
                    margin: "0 0.5rem",
                  },
                  "& button:first-of-type": {
                    marginRight: 0,
                  },
                }}
              >
                <Button
                  onClick={sendpassword}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send
                </Button>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{ marginTop: "10px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Back to login page
                  </Button>
                </Link>
              </Box>
            </Box>
          </WidgetWrapper>
        </Box>
      </Box>
      <Toaster />
    </form>
  );
};

export default ForgotPassword;

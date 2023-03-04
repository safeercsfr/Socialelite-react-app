import { Box, Button, CircularProgress, TextField } from "@mui/material";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userValid = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/forgotpassword/${id}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
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
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/${id}/${token}`,
          {
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
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
    <>
      {data ? (
        <form>
          <MDBContainer className="my-5 main">
            <MDBCard>
              <MDBRow className="g-0 body">
                <MDBCol md="6">
                  <MDBCardImage
                    src="https://cdn.mos.cms.futurecdn.net/pk2A58d5MnYCSGKAi2mGVS-1200-80.jpg"
                    alt="login form"
                    className="p-5 img-fluid"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      display: "inlineblock",
                    }}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBCardBody className="d-flex flex-column mt-5 d-flex align-items-centeryy">
                    {/* <div className='d-flex flex-row mt-2'>
                      <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

                      <span className="h1 fw-bold mb-0">HashTag</span>
                    </div> */}
                    {message ? (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        Passowrd updated successfully
                      </p>
                    ) : (
                      ""
                    )}

                    <h5
                      className="fw-normal my-4 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Enter your New Password
                    </h5>
                    <Box>
                      <TextField
                        name="password"
                        label="Enter new Password"
                        type="password"
                        value={password}
                        onChange={setval}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />

                      <Button
                        onClick={sendpassword}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Send
                      </Button>
                      <Link to="/">
                        <Button
                          sx={{ marginTop: "10px" }}
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Back to login page
                        </Button>
                      </Link>
                    </Box>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
          <Toaster />
        </form>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;

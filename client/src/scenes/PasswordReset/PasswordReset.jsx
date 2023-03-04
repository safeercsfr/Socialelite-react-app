import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { React, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("email is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/sendpasswordlink`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await res.data;
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
    <>
    <form>
      <MDBContainer className="my-5 main">
        <MDBCard>
          <MDBRow className="g-0 body">
            <MDBCol md="6">
              {/* <MDBCardImage
                src="https://img.freepik.com/premium-vector/sad-man-forgot-password-sitting-huge-laptop-with-padlock-shield-screen-suffering-about-lost-account-pin-code-cartoon-flat-illustration_87771-8195.jpg?w=2000"
                alt="login form"
                className="p-5 img-fluid"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  display: "inlineblock",
                }}
              /> */}
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column mt-5 d-flex align-items-centeryy">
                {/* <div className='d-flex flex-row mt-2'>
                      <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

                      <span className="h1 fw-bold mb-0">HashTag</span>
                    </div> */}
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Passowrd reset link send successfully in your Email
                  </p>
                ) : (
                  ""
                )}
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Enter your Email
                </h5>
                <Box>
                  <TextField
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />

                  <Button
                    onClick={sendLink}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Send
                  </Button>
                </Box>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Toaster />
    </form>
    </>
  );
};

export default PasswordReset;

import { TextField, Box, Typography, Grid, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import ChangePasswordWidget from "./ChangePasswordWidge";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditing, setUserData } from "state/authSlice";
import { putDataAPI } from "utils/fetchData";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UserEdit = ({ user, onSave, onCancel }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [occupation, setOccupation] = useState(user?.occupation);
  const dispatch = useDispatch()
  const { userId } = useParams();
  const token = useSelector((state) => state.token);


  const handleSave = () => {
    onSave({
      ...user,
      firstName,
      lastName,
      email,
      location,
      occupation,
    });
  };

  const onPasswordSave = async (userDetails) => {
    try {
      const { data } = await putDataAPI(`/users/${userId}`, userDetails, token);
      dispatch(setUserData({ user: data }));
      dispatch(setIsEditing({ isEditing: false }));
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "bottom-center",
      });
      console.error(err);
    }
  };

  const handleTextClick = () => {
    setIsPasswordEdit(true);
  };

  return isPasswordEdit ? (
    <ChangePasswordWidget
      user={user}
      onCancel={() => dispatch(setIsEditing({ isEditing: false }))}
      onPasswordSave={onPasswordSave}
    />
  ) : (
    <WidgetWrapper>
      <Toaster/>
      <Box p="1rem">
        <Typography
          variant="h4"
          color={dark}
          fontWeight="500"
          mb="1rem"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EditOutlined sx={{ mr: "0.5rem" }} />
          Edit profile
        </Typography>
        <Box
          onClick={handleTextClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: "1rem",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          <Typography>Change Password</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt="1rem">
          <Button variant="contained" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Box ml="1rem">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserEdit;

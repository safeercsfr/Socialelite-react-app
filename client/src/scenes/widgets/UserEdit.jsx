import { TextField, Box, Typography, Grid, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";

const UserEdit = ({ user, onSave, onCancel }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [occupation, setOccupation] = useState(user?.occupation);

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

  return (
    <WidgetWrapper>
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

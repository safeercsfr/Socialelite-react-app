import { TextField, Box, Typography, Grid, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";

const ChangePasswordWidget = ({ user, onPasswordSave, onCancel }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    onPasswordSave({
      ...user,
      oldPassword,
      newPassword,
      confirmPassword,
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
          Change Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt="1rem">
          <Button variant="contained" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Box ml="1rem">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={
                !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default ChangePasswordWidget;

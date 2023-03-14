import { Avatar, Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataAPI } from "utils/fetchData";

const UserSuggestion = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const getAllUsers = async () => {
    try {
      const { data } = await getDataAPI(`/users/${user._id}/suggestions`, token);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <WidgetWrapper style={{ position: "sticky", top: "7.3rem" }}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Suggestions
        </Typography>
      </FlexBetween>
      <Box>
          {users.map((user1) =>
              <Link
                key={user1._id} // add a unique key for each item
                style={{ textDecoration: "none" }}
                to={`/profile/${user1._id}`}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={1} // add some padding
                  borderRadius="5px"
                  _hover={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                  }} // add hover effect
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt="userImage"
                      src={`${user1.picturePath}`}
                      sx={{ marginRight: 1 }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "black" }}>
                      {user1.firstName} {user1.lastName}
                    </Typography>
                  </Box>
                </Box>
              </Link>
          )}
        </Box>
    </WidgetWrapper>
  );
};

export default UserSuggestion;

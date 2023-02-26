// import { useMediaQuery } from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const ProfilePosts = () => {
//   const [user, setUser] = useState([]);
//   const { userId } = useParams();
//   const token = useSelector((state) => state.token);
//   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

//   const getUser = async () => {
//     const response = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/posts/${userId}/posts`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     let data = response.data;
//     const arr = [];
//     data.forEach((element) => {
//       arr.push(element.picturePath);
//     });
//     setUser(arr);
//   };

//   useEffect(() => {
//     getUser();
//   }, [userId, token]);

//   const memoizedUser = useMemo(() => {
//     return user.filter((picturePath) => typeof picturePath !== "undefined").map((picturePath) => {
//       const modifiedPath = `${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`;
//       return <img key={picturePath} src={modifiedPath} alt="images" />;
//     });
//   }, [user]);

//   return (
//     <WidgetWrapper m="2rem 0">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "space-between",
//           img: {
//             maxWidth: "33%",
//             height: "auto",
//           },
//         }}
//       >
//         {memoizedUser}
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default ProfilePosts;

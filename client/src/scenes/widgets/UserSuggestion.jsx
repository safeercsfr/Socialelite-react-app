import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
// import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";


const UserSuggestion = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  // const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  // const imagePath = `${process.env.REACT_APP_BASE_URL}/assets/ads2.jpg`

  return (
    <WidgetWrapper style={{ position: "sticky", top: "7.3rem" }}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Suggestions
        </Typography>
        {/* <Typography color={medium}>Create Ad</Typography> */}
      </FlexBetween>
      {/* <img
        width="100%"
        height="auto"
        alt="advert"
        src={imagePath}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      /> */}
      {/* <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween> */}
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default UserSuggestion;

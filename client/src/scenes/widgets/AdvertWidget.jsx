import { Typography, darkScrollbar, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Weekly Challenge:
        </Typography>
        <Typography color={medium}>7 Days Left!</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info5.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={darkScrollbar}>Recycling</Typography>
        <Typography color={medium}>Jane Doe is in the lead!</Typography>

      </FlexBetween>
      <Typography color={main} m="0.5rem 0">
        Show us the things you recycled this past week! It can be things like paper, bottles, glass, and more!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
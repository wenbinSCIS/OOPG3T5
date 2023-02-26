import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
<Box width="100%" m="0 30px"  sx={{ borderLeft: '1px solid #ccc', paddingLeft: "60px" }}>
  <Box display="flex" justifyContent="space-between">
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: "black" }}
      >
        {title}
      </Typography>
    </Box>
    <Box>
      <ProgressCircle progress={progress} />
    </Box>
  </Box>
  <Box display="flex" justifyContent="space-between" mt="2px">
    <Typography variant="h7" sx={{ color: "gray" }}>
      {subtitle}
    </Typography>

  </Box>
</Box>
  );
};

export default StatBox;
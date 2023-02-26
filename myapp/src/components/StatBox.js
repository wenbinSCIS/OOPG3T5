import { Box, Typography} from "@mui/material";

import ProgressCircle from "./ProgressCircle";
import { Button } from 'react-bootstrap'
const StatBox = ({ title, subtitle, icon,loc , progress}) => {



  return (
<Box width="100%" m="0 30px"  sx={{ borderLeft: '2px solid lightgray', paddingLeft: "60px" }}>
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
  <Box mt="20px" textAlign="center" sx={{
  '& button': {
    backgroundColor: "transparent",
    border: "1px solid blue",
    marginLeft: "auto",
    marginRight: "auto",
  },
  '& > :not(style)': { flexGrow: 1 }
}}>
    <Button variant="contained" onClick={() => window.location.href = loc}>
      Bring me to the page
    </Button>
  </Box>
</Box>
  );
};

export default StatBox;
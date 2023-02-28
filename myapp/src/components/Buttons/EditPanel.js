import React from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";

const EditPanel = ({MoveDown,MoveUp,Add,Edit,Delete}) => {
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ justifyContent: "flex-end" }}
      >
        <IconButton
        onClick={MoveDown}
        >
          <ExpandCircleDownIcon fontSize="large" />
        </IconButton>
        <IconButton
        onClick={MoveUp}
        >
          <ExpandCircleDownIcon
            fontSize="large"
            sx={{ transform: "rotate(180deg)" }}
          />
        </IconButton>
        <Button
          alignItems="center"
          variant="contained"
          color="success"
          onClick={Add}
        >
          <AddIcon />
          &nbsp;Add
        </Button>
        <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={Edit}
        >
          <BuildIcon />
          &nbsp;Edit
        </Button>
        <Button
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          // startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          onClick={Delete}
        >
          <HighlightOffIcon />
          &nbsp;Remove
        </Button>
      </Stack>
    </div>
  );
}

export default EditPanel;

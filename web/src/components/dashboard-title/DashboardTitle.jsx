import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography} from "@mui/material";

const DashboardTitle = ({ title }) => {
  return (
    <Stack sx={{mb:2}}> 
      <Typography variant="h6">{title}</Typography>
    </Stack>
  )
};

DashboardTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default DashboardTitle;

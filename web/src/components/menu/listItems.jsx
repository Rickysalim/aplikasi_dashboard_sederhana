import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideNav } from "../../config/sidebar-nav-items";
import Iconify from "../Iconify";

const listItems = () => (
  <>
    {sideNav.map((item) => (
      <ListItemButton to={item.to}>
        <ListItemIcon><Iconify icon={item.icon} width="30px"/></ListItemIcon>
        <ListItemText primary={item.primary} />
      </ListItemButton>
    ))}
  </>
);

export default listItems
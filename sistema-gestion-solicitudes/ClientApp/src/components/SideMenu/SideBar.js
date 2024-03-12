import React from "react";
import {
     List, ListItem, Box,
    Typography, Divider, ListItemIcon, ListItemText,
     Avatar
} from '@mui/material';

import classNames from "classnames";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { useSidebarData } from "./SideBarOptions"

//const sidebarData = useSidebarData();


const SideBar = ({ isOpen }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: '5px',
                    m: '5px'
                }}>

                
                    <Typography
                        variant="h6"
                    sx={{ flexGrow: 1, color: 'white', p: "5px" }}
                    >
                        Mi perfil
                    </Typography>

                
                <Avatar
                    alt="R"
                    src="/"
                    sx={{ textAlign: 'center' }}
                />

            </Box>

       
      
    </div>
    <div className="side-menu">
            <Divider />

            <List>
                {useSidebarData().map((item) => (
                    <ListItem key={item.id} component={Link} to={item.path} >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                            sx={{ color: 'white' }}
                            primary={item.titulo} />
                    </ListItem>
                ))}
            </List>


            <Box sx={{
                display: 'flex', justifyContent: 'center',

            }}>
                <img src={logo} alt="logo Espol" width='200vw' style={{ position: "absolute", bottom: '0px' }} />
            </Box>

     
    </div>
  </div>
);
export default SideBar;

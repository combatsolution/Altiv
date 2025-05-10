import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsMobileMenuOpen(open);
  };

  const navLinks = [
    { label: "AI Career Coach", href: "https://www.google.com/" },
    { label: "Jobs", href: "https://www.google.com/" },
    { label: "Analyse your Resume", href: "https://www.google.com/" },
  ];

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            <span style={{ color: "#000" }}>ALTIV.</span>
            <span style={{ color: "#555" }}>AI</span>
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {navLinks.map((item) => (
              <Button key={item.label} href={item.href} color="inherit">
                {item.label}
              </Button>
            ))}
            <Button href="https://www.google.com/" color="primary ">Login</Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "999px", textTransform: "none" }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={isMobileMenuOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ALTIV.AI
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map((item) => (
              <ListItem component="a" href={item.href} key={item.label}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem  component="a" href="https://www.google.com/">
              <ListItemText primary="Login" primaryTypographyProps={{ color: "primary" }} />
            </ListItem>
            <Box px={2} pt={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: "999px", textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;

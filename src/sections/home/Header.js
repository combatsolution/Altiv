import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
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
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "white" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          px: { xs: 2, sm: 3 },
          pt: 8,
          
        }}
      >

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1, // allows the logo to push nav to the right
            // pl: { xs: 0, sm: 6 },
            pl: 10,
            
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: { xs: "30px", sm: "30px" },
              lineHeight: "50px",
              letterSpacing: "0.15px",
              

            }}
          >
            ALTIV.
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: "Arial",
              fontWeight: "semibold",
              fontSize: { xs: "20px", sm: "30px" },
              lineHeight: "60px",
              letterSpacing: "0.15px",
              ml: 0.5,  
            }}
          >
            AI
          </Typography>
        </Box>


        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
            mr: 4,
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.label}
              href={link.href}
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "26px",
                color: "grey.700",
                minWidth: 0,
                px: 1,
                "&:hover": { color: "black" },
              }}
            >
              {link.label}
            </Button>
          ))}

          <Button
            href="https://www.google.com/"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "26px",
              color: "#1976d2",
              textTransform: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Login
          </Button>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "rgba(0,0,0,0.1)" }} />

          <Button
            variant="contained"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "21px",
              borderRadius: "999px",
              px: 2,
              height: "32px",
              textTransform: "none",
              minWidth: "70px",
              mr: "50px",
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Sign Up
          </Button>

        </Box>

        {/* Mobile Menu Toggle */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={toggleDrawer(true)} edge="end">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isMobileMenuOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ p: 3, width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((item) => (
              <ListItem button component="a" href={item.href} key={item.label}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button component="a" href="https://www.google.com/">
              <ListItemText
                primary="Login"
                primaryTypographyProps={{ color: "primary", fontWeight: "medium" }}
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ borderRadius: "999px", textTransform: "none" }}
              >
                Sign Up
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;

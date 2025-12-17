import { memo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "../contexts/ColorModeContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Buy A Book", to: "/products" },
  { label: "Get Published", to: "/get-published" },
  { label: "Idea Generator", to: "/idea-generator" },
  { label: "Contact", to: "/contact" },
];

function HeaderComponent() {
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderRadius: 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", gap: 2, py: 1.5, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <Box display="flex" alignItems="center" sx={{ mr: "auto" }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={800}
            letterSpacing={0.5}
          >
            LEEMAJOR PUBLISHING
          </Typography>
        </Box>
        {isMdUp ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => {
              const selected = location.pathname === item.to;
              return (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color={selected ? "primary" : "secondary"}
                  variant={selected ? "contained" : "text"}
                  sx={{
                    borderRadius: 8,
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            <ThemeToggle />
          </Box>
        ) : (
          <>
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={() => setOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <Box sx={{ width: 260, p: 1 }} role="presentation">
                <List>
                  {navItems.map((item) => {
                    const selected = location.pathname === item.to;
                    return (
                      <ListItemButton
                        key={item.to}
                        component={RouterLink}
                        to={item.to}
                        selected={selected}
                        onClick={() => setOpen(false)}
                        sx={{
                          "&:hover": {
                            color: theme.palette.primary.contrastText,
                          },
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    );
                  })}
                </List>
                <Box sx={{ px: 2, py: 1.5 }}>
                  <ThemeToggle fullWidth />
                </Box>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default memo(HeaderComponent);

type ToggleProps = { fullWidth?: boolean };
function ThemeToggle({ fullWidth }: ToggleProps) {
  const theme = useTheme();
  const { mode, toggle } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  return (
    <Button
      onClick={toggle}
      variant="outlined"
      color="inherit"
      startIcon={isDark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      sx={{
        borderRadius: 999,
        px: 1.5,
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))"
            : "linear-gradient(180deg, rgba(30,34,44,0.8), rgba(18,21,28,0.6))",
        backdropFilter: "blur(6px)",
        borderColor: theme.palette.divider,
        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      }}
      fullWidth={fullWidth}
    >
      {isDark ? "Dark" : "Light"}
    </Button>
  );
}

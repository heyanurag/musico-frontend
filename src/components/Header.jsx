import { forwardRef, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import makeStyles from "@mui/styles/makeStyles";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { useRecoilValue } from "recoil";
import { user, nowPlaying } from "../atoms";

const authenticatedListData = [
  { id: "0", name: "Home", Icon: HomeIcon, routeName: "/" },
  { id: "1", name: "Search", Icon: SearchIcon, routeName: "/search" },
  { id: "2", name: "About", Icon: InfoIcon, routeName: "/about" },
];

const listData = [
  { id: "0", name: "Home", Icon: HomeIcon, routeName: "/" },
  { id: "1", name: "Login", Icon: LoginIcon, routeName: "/login" },
  { id: "2", name: "Register", Icon: PersonAddAltIcon, routeName: "/register" },
];

export const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.secondary.main,
    margin: "8px 16px",
    borderRadius: 15,
    color: "#fff",
    "& .icon": {
      color: "#fff",
    },
    "&:hover .icon, &:hover .text ": {
      color: theme.palette.primary.main,
    },
  },
  inActive: {
    borderRadius: 15,
    margin: "8px 16px",
  },
}));

const Header = (props) => {
  const loggedInUser = useRecoilValue(user);
  const nowP = useRecoilValue(nowPlaying);

  const styles = useStyles();

  const navigationList = !loggedInUser ? listData : authenticatedListData;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const CustomLink = useMemo(() =>
    forwardRef(
      ({ activeClass, inActiveClass = "", className, ...props }, ref) => {
        return (
          <NavLink
            ref={ref}
            {...props}
            className={({ isActive }) =>
              `${className} ${isActive ? activeClass : inActiveClass}`
            }
          />
        );
      },
      []
    )
  );

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography align="center" variant="h1" pt={2}>
          🎶
        </Typography>
        <Typography
          align="center"
          variant="h5"
          sx={{ color: "secondary.main" }}
          gutterBottom
          pt={2}
        >
          Musico
        </Typography>
        <Typography align="center" variant="subtitle2" gutterBottom>
          Explore Top Music Powered by your Scrobbles!
        </Typography>
      </Box>
      <Divider />
      <List sx={{ overflow: "hidden" }}>
        {navigationList.map(({ name, id, Icon, routeName }) => (
          <ListItem
            component={CustomLink}
            to={routeName}
            button
            key={id}
            activeClass={styles.active}
            inActiveClass={styles.inActive}
          >
            <ListItemIcon>
              <Icon className="icon" />
            </ListItemIcon>
            <ListItemText className="text" primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {nowP && (
        <>
          <Typography
            align="center"
            variant="h6"
            sx={{ color: "secondary.main" }}
            gutterBottom
            pt={1}
          >
            Now Playing
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={nowP.album.images[1].url} width={125} />
          </div>
          <Typography align="center" variant="subtitle2" gutterBottom pt={1}>
            {nowP.name}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {nowP.artists.map((artist) => (
              <Typography
                component="span"
                align="center"
                variant="subtitle2"
                gutterBottom
              >
                {artist.name},&nbsp;
              </Typography>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "secondary.main",
          display: { xs: "block", sm: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Musico
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;

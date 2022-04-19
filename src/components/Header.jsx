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
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import makeStyles from "@mui/styles/makeStyles";

const listData = [
  { id: "0", name: "Home", Icon: HomeIcon, routeName: "/" },
  { id: "1", name: "Friends", Icon: PeopleIcon, routeName: "/friends" },
  { id: "2", name: "About", Icon: InfoIcon, routeName: "/about" },
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
  },
  inActive: {
    borderRadius: 15,
    margin: "8px 16px",
  },
}));

const Header = (props) => {
  const styles = useStyles();

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
      <List sx={{ overflow: "hidden"}}>
        {listData.map(({ name, id, Icon, routeName }) => (
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
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
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

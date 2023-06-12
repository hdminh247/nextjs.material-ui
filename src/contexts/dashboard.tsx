// External
import React, { createContext, useContext } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Material UI Components
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Divider, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import VisibilityIcon from "@material-ui/icons/Visibility";
// Custom Components
import PrimaryButton from "../components/PrimaryButton";
import AppBarMenuItems from "../components/Header/AppBarMenuItems";
import HeaderBanner, { getTypeByStatus } from "../components/Dashboard/HeaderBanner";

// Contexts
import { AuthState, Role, useAuth } from "./auth";

// Constants
import {
  dashboardRouteDetails,
  dashboardRoutes,
  drawerWidth,
  helpItems,
  mainItems,
  publicPageBaseUrl,
} from "../constants";
import colors from "../palette";

// @ts-ignore
const context = createContext<Context>({});

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuIcon: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
      backgroundColor: colors.standardGreySubFooter,
      height: "100vh",
    },
    childrenRoot: {
      height: "calc(100vh - 110px)",
      backgroundColor: colors.white,
      padding: theme.spacing(2),
      overflow: "auto",
    },
    hasBanner: {
      paddingTop: theme.spacing(10),
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(14),
      },
    },
    bottomList: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
    operationContainer: {
      margin: "0 0 24px",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
        width: "inherit",
        margin: "0 0 24px 20px",
      },
    },
    backButton: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    button: {
      marginLeft: "auto",
      borderRadius: "15px",
      color: colors.black,
      padding: "10px 25px",
      backgroundColor: colors.white,
      "&:hover": {
        backgroundColor: colors.white,
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    mobileUploadButton: {
      borderRadius: "15px",
      color: colors.black,
      padding: "5px 25px",
      backgroundColor: colors.white,
      "&:hover": {
        backgroundColor: colors.white,
      },
      border: `solid 1px ${colors.standardLightGrey}`,
      width: "100%",
    },
    profileButton: {
      padding: "3px 8px 1px 5px",
      borderRadius: "35px",
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 15%)",
      border: `solid 1px ${colors.standardGreySubFooter}`,
      backgroundColor: colors.standardGreyFooter,
      marginLeft: "20px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    accountName: {
      marginLeft: "10px",
      marginRight: "10px",
      fontWeight: 500,
      fontSize: ".8rem",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "100%",
      width: "100%",
      "&:hover": {
        outline: "none",
      },
    },
    modalCloseButton: {
      position: "absolute",
      right: "15px",
    },
    leftAuto: {
      marginLeft: "auto",
    },
    activeListItem: {
      backgroundColor: colors.standardGreySubFooter,
    },
  }),
);

// Get current dashboard route detail
const getRouteDetail = (path: string) => {
  if (!AuthState.authenticated) {
    return {
      name: "",
      backButton: false,
    };
  }
  const detail: any = dashboardRouteDetails.filter((route) => route.path === path);
  return detail.length > 0 ? detail[0] : { name: "", backButton: false };
};

export function DashboardContext({ children }: Props) {
  const {
    status,
    user,
    user: { role } = { role: Role.REGULAR },
    logOut,
    getRoleDetail,
    isCompleteRoleProfile,
  } = useAuth();
  const classes = useStyles();
  const { pathname, push } = useRouter();

  const {
    name,
    backButton: { enable: enableBackButton, path: backButtonPath },
  } = getRouteDetail(pathname);

  // Side bar open
  const [open, setOpen] = React.useState(false);
  // Anchor to show profile drop down menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Modal open
  const [modalOpen, setModalOpen] = React.useState(false);

  // Open modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Drop down menu open
  const isMenuOpen = Boolean(anchorEl);

  // Open sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Close side bar
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Close drop down menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open drop down menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Check if current location path match with item url or not
  const isActive = (url: string) => {
    // For dashboard url, need to be exactly matched
    if (url === "/dashboard") {
      return window.location.pathname === "/dashboard";
    } else {
      return window.location.pathname.includes(url);
    }
  };

  // Drop down menu components
  const menuId = "dashboard-account-menu";
  const renderMenu = user && (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <AppBarMenuItems handleMenuClose={handleMenuClose} />
    </Menu>
  );

  return (
    <context.Provider value={{}}>
      {status === AuthState.authenticated && dashboardRoutes.includes(pathname) && (
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <List>
              {mainItems.map((item, index) => {
                if (item.acceptRoles.includes(user?.role as Role)) {
                  return (
                    <ListItem
                      button
                      key={index}
                      className={clsx({ [classes.activeListItem]: isActive(item.url) })}
                      onClick={() => {
                        push(item.url);
                      }}
                    >
                      <ListItemIcon>
                        {item.url === "/dashboard/conversations" ? (
                          <Badge color="primary" overlap="rectangular" badgeContent={user?.unread_inbox_count}>
                            {item.icon}
                          </Badge>
                        ) : item.url === "/dashboard/bookings" ? (
                          <Badge color="primary" overlap="rectangular" badgeContent={user?.pending_bookings_count}>
                            {item.icon}
                          </Badge>
                        ) : (
                          item.icon
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                } else {
                  return <div key={index} />;
                }
              })}
            </List>
            <List className={classes.bottomList}>
              {helpItems.map((item, index) => {
                if (item.acceptRoles.includes(user?.role as Role)) {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => {
                        push(item.url);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                } else {
                  return <div key={index} />;
                }
              })}

              {(user?.role === Role.ARTIST || user?.role === Role.STUDIO) && (
                <ListItem
                  button
                  onClick={() => {
                    push(
                      `${publicPageBaseUrl}/${user?.role === Role.STUDIO ? "studios" : "artists"}/${
                        getRoleDetail().slug
                      }`,
                    );
                  }}
                >
                  <ListItemIcon>{<VisibilityIcon />}</ListItemIcon>
                  <ListItemText primary={"My online profile"} />
                </ListItem>
              )}
            </List>
          </Drawer>
          {role !== Role.REGULAR && role !== Role.ADMIN && getRoleDetail().status !== "approved" && (
            <HeaderBanner
              status={getTypeByStatus(getRoleDetail().status)}
              requireActivation={!isCompleteRoleProfile()}
            />
          )}
          <main
            className={clsx(classes.content, {
              [classes.hasBanner]:
                role !== Role.REGULAR && role !== Role.ADMIN && getRoleDetail().status !== "approved",
            })}
          >
            <MenuIcon className={classes.menuIcon} onClick={handleModalOpen} />
            <Grid container item alignItems={"center"} className={classes.operationContainer}>
              {enableBackButton && (
                <IconButton
                  className={classes.backButton}
                  onClick={() => {
                    push(backButtonPath);
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <div>
                <Typography variant={"h5"}>
                  <b>{!isCompleteRoleProfile() && name === "Dashboard" ? "Welcome to TrueArtists" : name}</b>
                </Typography>
                {!isCompleteRoleProfile() && name === "Dashboard" && (
                  <Typography variant={"subtitle1"}>{"Let's get you setup"}</Typography>
                )}
              </div>
              {user?.role !== Role.REGULAR && role !== Role.ADMIN && (
                <PrimaryButton
                  variant="contained"
                  startIcon={<AddIcon />}
                  className={classes.button}
                  onClick={() => {
                    push("/dashboard/upload-tattoos");
                  }}
                >
                  Upload Tattoo Photos
                </PrimaryButton>
              )}

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileMenuOpen}
                className={clsx({ [classes.leftAuto]: user?.role === Role.REGULAR || user?.role === Role.ADMIN })}
                classes={{ root: classes.profileButton }}
              >
                <Badge color="primary" overlap="circular" badgeContent={user?.unread_inbox_count}>
                  <Avatar alt={user?.full_name || "Avatar"} src={user?.avatar?.image_url} />
                </Badge>
                <Typography className={classes.accountName}>{user?.full_name}</Typography>

                <ExpandMoreIcon />
              </IconButton>
              {renderMenu}
            </Grid>
            <Grid container item className={classes.childrenRoot}>
              {children}
            </Grid>
          </main>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={modalOpen}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modalOpen}>
              <div className={classes.paper}>
                <CloseIcon className={classes.modalCloseButton} onClick={handleModalClose} />
                <List>
                  <ListItem>
                    <PrimaryButton
                      variant="contained"
                      startIcon={<AddIcon />}
                      className={classes.mobileUploadButton}
                      onClick={() => {
                        handleModalClose();
                        push("/dashboard/upload-tattoos");
                      }}
                    >
                      Upload
                    </PrimaryButton>
                  </ListItem>
                  {mainItems.map((item, index) => {
                    if (item.acceptRoles.includes(user?.role as Role)) {
                      return (
                        <ListItem
                          button
                          key={index}
                          onClick={() => {
                            handleModalClose();
                            push(item.url);
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      );
                    } else {
                      return <div key={index} />;
                    }
                  })}
                </List>
                <Divider />
                <List>
                  <ListItem
                    button
                    onClick={() => {
                      handleModalClose();
                      push("/dashboard/profile");
                    }}
                  >
                    <ListItemText primary="Profile" />
                  </ListItem>
                </List>
                <List className={classes.bottomList}>
                  {helpItems.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => {
                        handleModalClose();
                        push(item.url);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}

                  <ListItem
                    button
                    onClick={() => {
                      handleModalClose();
                      logOut();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </div>
            </Fade>
          </Modal>
        </div>
      )}

      {(status !== AuthState.authenticated || !dashboardRoutes.includes(pathname)) && children}
    </context.Provider>
  );
}

export function useDashboard() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

interface Context {}

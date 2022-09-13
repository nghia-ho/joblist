import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../auth/AuthProvider";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  function useAuth() {
    return React.useContext(AuthContext);
  }
  // Auth user
  function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    if (!auth.user) {
      return (
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          display="flex"
          alignItems="center"
        >
          <Link to="/login" state={{ backgroundLocation: location }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                auth.signin(true);
              }}
            >
              <LoginIcon />
            </IconButton>
          </Link>
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Sign in
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{ display: { xs: "none", md: "flex" } }}
        display="flex"
        alignItems="center"
      >
        <Typography
          variant="body1"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {auth.user === true ? `` : `Welcome ${auth.user}`}
        </Typography>

        <IconButton
          size="large"
          color="inherit"
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          <LoginIcon />
        </IconButton>
        <Typography
          variant="body1"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Sign out
        </Typography>
      </Box>
    );
  }
  // Search param
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            float: "none",
            width: "63%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Job Router
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchParams.get("filter") || ""}
              onChange={(event) => {
                let filter = event.target.value;
                if (filter) {
                  setSearchParams({ filter });
                } else {
                  setSearchParams({});
                }
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <AuthStatus />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

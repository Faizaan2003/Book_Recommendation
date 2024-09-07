import { Typography, Box, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";
import { Loading } from "./Loading.jsx";
import Logo from "./logo.jpeg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Tooltip from "@mui/material/Tooltip";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import axios from "axios";
import { BASE_URL } from "../config.js";

function Appbar() {
  const [search, setSearch] = useState("");
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const isLargeScreen = useMediaQuery("(min-width:321px)");

  const navigate = useNavigate();

  if (userLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (isLargeScreen) {
    if (userEmail) {
      return (
        <div>
          <Box>
            <AppBar position="fixed">
              <Toolbar>
                <div
                  style={{ marginLeft: 10, cursor: "pointer", flexGrow: 1 }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    src={Logo}
                    alt="cant be viewed"
                    width={150}
                    height={50}
                  />
                </div>
                <div
                  style={{
                    flexGrow: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <TextField
                    placeholder="Search Book title, author"
                    type="search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "25px",
                      marginRight: 10,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ marginTop: 10 }}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        if (search.length !== 0) {
                          window.location = "/books/" + search;
                        } else {
                          alert("Enter details correctly!");
                        }
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>

                <div
                  style={{ marginRight: 10, cursor: "pointer" }}
                  onClick={() => {
                    navigate("/bookmarks");
                  }}
                >
                  <Tooltip title="Favourites">
                    <BookmarksIcon fontSize="large" />
                  </Tooltip>
                </div>

                <div style={{ marginRight: 10 }}>
                  <Button
                    color="inherit"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    <Tooltip title="Home">
                      <HomeRoundedIcon fontSize="large" />
                    </Tooltip>
                  </Button>
                </div>

                <div style={{ marginRight: 10 }}>
                  <Typography variant="subtitle1">{userEmail}</Typography>
                </div>

                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    setUser({
                      isLoading: false,
                      userEmail: null,
                    });
                    navigate("/");
                  }}
                >
                  <Tooltip title="Log Out">
                    <LogoutRoundedIcon fontSize="large" />
                  </Tooltip>
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      );
    } else {
      return (
        <Box>
          <AppBar position="fixed">
            <Toolbar>
              <div
                style={{ marginLeft: 10, cursor: "pointer", flexGrow: 1 }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={Logo} alt="cant be viewed" width={150} height={50} />
              </div>
              <Button
                color="inherit"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `${BASE_URL}/login`,
                      {
                        username: "rehaan@gmail.com",
                        password: "123",
                      },
                      {
                        headers: {
                          "Content-type": "application/json",
                        },
                      }
                    );
                    const data = res.data;
                    if (data.access_token) {
                      localStorage.setItem("token", data.access_token);
                      // window.location = "/"
                      setUser({
                        userEmail: "rehaan@gmail.com",
                        isLoading: false,
                      });
                      alert("You logged in with default credentials!");
                      navigate("/");
                    }
                  } catch (error) {
                    alert(error.response.data.message);
                  }
                }}
              >
                Guest
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Signin
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Signup
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  } else {
    return (
      <div>
        <Box>
          <AppBar position="fixed" style={{ width: "320px" }}>
            <Toolbar
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "64px", // Default height for Toolbar
              }}
            >
              <div
                style={{
                  margin: "8px 0",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={Logo} alt="logo" width={120} height={35} />
              </div>

              {userEmail ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <TextField
                      placeholder="Search"
                      type="search"
                      variant="outlined"
                      size="small"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "25px",
                        marginBottom: 8,
                        width: "85%",
                        fontSize: "0.75rem",
                      }}
                      InputProps={{
                        style: {
                          padding: "0px", // Adjust padding to reduce height
                          fontSize: "0.75rem", // Adjust font size to fit the smaller height
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      color="inherit"
                      onClick={() => {
                        if (search.length !== 0) {
                          window.location = "/books/" + search;
                        } else {
                          alert("Enter details correctly!");
                        }
                      }}
                      style={{ fontSize: "0.75rem" }}
                    >
                      Search
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      //   flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      //   flexWrap: "wrap",
                      //   gap: "6px",
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/bookmarks");
                      }}
                    >
                      <Tooltip title="Favourites">
                        <BookmarksIcon fontSize="small" />
                      </Tooltip>
                    </div>
                    <div>
                      <Button
                        color="inherit"
                        onClick={() => {
                          navigate("/home");
                        }}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Tooltip title="Home">
                          <HomeRoundedIcon fontSize="small" />
                        </Tooltip>
                      </Button>
                    </div>
                    <div style={{ width: "100%", marginLeft: 20 }}>
                      <Typography
                        variant="caption"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {userEmail}
                      </Typography>
                    </div>
                    <Button
                      color="inherit"
                      onClick={() => {
                        localStorage.setItem("token", null);
                        setUser({
                          isLoading: false,
                          userEmail: null,
                        });
                        navigate("/");
                      }}
                      style={{ fontSize: "0.75rem" }}
                    >
                      <Tooltip title="Log Out">
                        <LogoutRoundedIcon fontSize="small" />
                      </Tooltip>
                    </Button>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Button
                    color="inherit"
                    onClick={async () => {
                      try {
                        const res = await axios.post(
                          `${BASE_URL}/login`,
                          {
                            username: "rehaan@gmail.com",
                            password: "123",
                          },
                          {
                            headers: {
                              "Content-type": "application/json",
                            },
                          }
                        );
                        const data = res.data;
                        if (data.access_token) {
                          localStorage.setItem("token", data.access_token);
                          setUser({
                            userEmail: "rehaan@gmail.com",
                            isLoading: false,
                          });
                          alert("You logged in with default credentials!");
                          navigate("/");
                        }
                      } catch (error) {
                        alert(error.response.data.message);
                      }
                    }}
                    style={{ fontSize: "0.75rem" }}
                  >
                    Guest
                  </Button>

                  <Button
                    color="inherit"
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ fontSize: "0.75rem" }}
                  >
                    Signin
                  </Button>

                  <Button
                    color="inherit"
                    onClick={() => {
                      navigate("/register");
                    }}
                    style={{ fontSize: "0.75rem" }}
                  >
                    Signup
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}

export default Appbar;

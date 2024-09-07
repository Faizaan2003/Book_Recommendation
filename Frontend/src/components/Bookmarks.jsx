import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Loading } from "./Loading";
import { BASE_URL } from "../config";

export const Bookmarks = () => {
  const [favourites, setFavourites] = useState([]);
  const userEmail = useRecoilValue(userEmailState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/favourites`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setFavourites(response.data.favorites);
        setLoading(false);
      });
  }, []);

  const removeFromFavorites = async (bookTitle) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/favourites/delete`,
        { book_title: bookTitle },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-type": "application/json",
          },
        }
      );
      alert(response.data.message);
      setFavourites(favourites.filter((book) => book.title !== bookTitle));
    } catch (error) {
      console.error("Error removing book from favorites:", error);
      alert(error.response.data.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (userEmail && favourites.length == 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Roboto",
            fontSize: "30px",
            color: "#FFD700", // Gold color for a shiny effect
            padding: "20px",
            textShadow:
              "3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 215, 0, 0.8), 0 0 5px rgba(255, 215, 0, 0.7)", // Adds depth and shine
          }}
        >
          <h1>Please add your favourites!</h1>
        </div>
      </div>
    );
  }

  return (
    userEmail && (
      <div>
        <div
          style={{
            paddingTop: 75,
            marginLeft: 50,
            color: "#FFD700", // Gold color
            textShadow:
              "3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 215, 0, 0.8), 0 0 5px rgba(255, 215, 0, 0.7)", // Shiny gold effect
          }}
        >
          <h1>Your favourites:</h1>
        </div>

        <div
          style={{ paddingTop: 10, display: "flex", flexDirection: "column" }}
        >
          {favourites.map((book, index) => (
            <Card
              key={index}
              style={{ marginBottom: 20, backgroundColor: "#f0f0f0" }}
            >
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={book.book_image}
                  width={150}
                  height={150}
                  alt={`Book cover for ${book.title}`}
                  style={{ marginRight: 20 }}
                />
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", marginBottom: 10 }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ color: "#555", marginBottom: 10 }}
                  >
                    {book.author}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      if (userEmail == "rehaan@gmail.com")
                        alert("You can't remove with default credentials!");
                      else {
                        removeFromFavorites(book.title);
                      }
                    }}
                    color="secondary"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

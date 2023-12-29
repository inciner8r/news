import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";

// Initialize Firebase with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVcs2BwM3N5v_lZm9gYivBjfO8BIgydaY",
  authDomain: "sample-bd02a.firebaseapp.com",
  projectId: "sample-bd02a",
  storageBucket: "sample-bd02a.appspot.com",
  messagingSenderId: "445449868134",
  appId: "1:445449868134:web:e1ca186eb2cf79e4bd6ea7",
  measurementId: "G-1W3L19C0L7",
};
firebase.initializeApp(firebaseConfig);

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if data is present in the cache
        const cachedData = localStorage.getItem("cachedData");
        if (cachedData) {
          setArticles(JSON.parse(cachedData));
        }

        const response = await axios.get(endpointPath(country, newscategory));
        if (response.status === 200) {
          const parsedData = response.data;
          setArticles(parsedData.articles);
          localStorage.setItem(
            "cachedData",
            JSON.stringify(parsedData.articles)
          );
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country, newscategory]);

  const handleLike = (newsId) => {
    // Get a reference to the Firebase database
    const database = firebase.database();

    // Use the newsId as a key to store the like information
    const likeRef = database.ref(`likes/${newsId}`);

    // Check if the news has already been liked
    likeRef.once("value", (snapshot) => {
      const alreadyLiked = snapshot.exists();

      if (alreadyLiked) {
        // News is already liked, remove the like
        likeRef.remove();
      } else {
        // News is not liked, add the like
        likeRef.set({
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
      }
    });
  };

  const isNewsLiked = (newsId) => {
    const database = firebase.database();
    const likeRef = database.ref(`likes/${newsId}`);

    return likeRef.once("value").then((snapshot) => snapshot.exists());
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(newscategory)}</Header>
          <Container>
            <Row>
              {articles.map((element, key) => {
                const newsId = uuidv4();
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={newsId}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.image === null ? NullImage : element.image
                      }
                      urlNews={element.url}
                      onLike={() => handleLike(newsId)}
                      isLiked={isNewsLiked(newsId)}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;

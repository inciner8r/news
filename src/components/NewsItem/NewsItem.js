import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import { card, img, btn, text } from "./index";
import "./style.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function NewsItem(props) {
  const {
    imageUrl,
    alt,
    description,
    title,
    channel,
    published,
    urlNews,
    isLiked,
  } = props;
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setliked] = useState(false);
  const handleLikeClick = () => {
    // Update the local state to immediately reflect the change
    if (!liked) {
      setLikesCount(1);
      setliked(true);
    } else {
      setLikesCount(0);
      setliked(false);
    }
  };

  useEffect(() => {
    const database = firebase.database();
    const likesRef = database.ref(`likes/${props.newsId}`); // Assume you have a unique newsId for each NewsItem

    // Cleanup the listener when the component unmounts
    return () => {
      likesRef.off("value");
    };
  }, [props.newsId]);

  return (
    <>
      <Card style={card}>
        <Card.Img style={img} variant="top" src={imageUrl} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={text}>{description}</Card.Text>
          <Details channel={channel} published={published} />
          <Button onClick={handleLikeClick} style={btn}>
            {liked ? "Unlike" : "Like"} ({likesCount})
          </Button>
          <Button href={urlNews} target="_blank" style={btn}>
            Read more →
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
  onLike: PropTypes.func, // Function to handle the like
  isLiked: PropTypes.bool, // Whether the news item is liked or not
  newsId: PropTypes.string, // Unique identifier for each NewsItem
};

export default NewsItem;

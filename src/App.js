import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";
import { Button } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class App extends Component {
  //Component level state to store photos from unsplash API.
  //The index is to indicate which image has to be shown in lightbox.
  //When image is clicked isLightBoxOpen becomes true
  //and image opens in lightbox .

  state = {
    photos: [],
    index: 0,
    isLightBoxOpen: false
  };
  componentDidMount() {
    // Using GET method to get the photos from unsplash API.
    request.get(url).then(image => {
      this.setState({
        photos: image.body
      });
    });
  }
  //onLoadMore arrow function to load more photos
  onLoadMore = () => {
    //requesting unsplash API
    request.get(url).then(image => {
      //without changing the original state updating the state values
      this.setState({
        photos: [...this.state.photos, ...image.body]
      });
    });
  };
  // when isLightBoxOpen is true, onLightBoxOpen function is called
  onLightBoxOpen = index => {
    this.setState({
      index: index,
      isLightBoxOpen: true
    });
  };
  render() {
    return (
      <div className="App">
        <h1>My Gallery</h1>
        {/* If there are no photos available, display loading otherwise display photos  */}
        {!this.state.photos && "Loading..."}
        {this.state.photos && (
          <ul className="grid-image-container">
            {this.state.photos.map((photo, index) => (
              <div>
                <img
                  key={index}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="grid-image-item"
                  onClick={() => this.onLightBoxOpen(index)}
                />
              </div>
            ))}
          </ul>
        )}
        {/* LightBox component to display image in lightbox with title of the image 
        close, next, previous, zoom in, zoom out functionality */}
        {this.state.isLightBoxOpen && (
          <Lightbox
            mainSrc={this.state.photos[this.state.index].urls.regular}
            nextSrc={
              this.state.photos[
                (this.state.index + 1) % this.state.photos.length
              ].urls.regular
            }
            prevSrc={
              this.state.photos[
                (this.state.index + this.state.photos.length - 1) %
                  this.state.photos.length
              ].urls.regular
            }
            onCloseRequest={() => this.setState({ isLightBoxOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                index:
                  (this.state.index + this.state.photos.length - 1) %
                  this.state.photos.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                index: (this.state.index + 1) % this.state.photos.length
              })
            }
            imageTitle={this.state.photos[this.state.index].alt_description}
          />
        )}
        {/* button to load more photos on click event */}
        <div>
          <Button variant="contained" color="primary" onClick={this.onLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}

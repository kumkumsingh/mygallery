import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";
import { Button } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class App extends Component {
  //photos is an array to store photos from unsplash API.
  //index is to indicate which image has to be shown in lightbox.
  //Initially isLightBoxOpen is false and its true only when user click on particular image.

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
  // When an image is clicked, onLightBoxOpen function is called and 
  //isLightBoxOpen becomes true and image opens up in lightbox popup. 
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
        {/* If there are no photos available, display loading text otherwise display fetched photos  */}
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
        {/* LightBox to display an image in lightbox with the title of the image,
        close, next, previous, zoom in and zoom out functionality */}
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
        {/* button to load more photos on click of load more button */}
        <div>
          <Button variant="contained" color="primary" onClick={this.onLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";

export default class App extends Component {
   // Component level state to fetch photos from unsplash API.
   state = {
    photos: [],
  };
  componentDidMount() {
    // Using GET method getting the photos from unsplash API.
    request.get(url).then(image => {
      this.setState({
        photos: image.body
      });
    });
  }
  render() {
    return (
      <div className="App">
        <h1>My Gallery</h1>
        {/* If there is no photos available display loading otherwise display photos  */}
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
                />
              </div>
            ))}
          </ul>
          
        )}
        
      </div>
    )
  }
}

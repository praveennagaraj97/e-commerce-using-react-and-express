import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "70%",
  height: "70%",
  margin: "auto",
  borderRadius: "10px",
};

class GMaps extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 13,
            lng: 77,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDgU7R4x-ZkR7_FmwRWRWsHPny3moXLbCQ",
})(GMaps);

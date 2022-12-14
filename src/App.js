import React from "react";
import "./App.css";
import io from 'socket.io-client';

const socket = io();


function App() {
  const streamCamVideo = () => {
    var constraints = { audio: false, video: { width: 1280, height: 720 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector("video");
        socket.emit(mediaStream);
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
  };

  return (
    <div>
      <div id="container">
        <video autoPlay={true} id="videoElement" controls></video>
      </div>
      <br />
      <button onClick={streamCamVideo}>Start streaming</button>
    </div>
  );
}

export default App;

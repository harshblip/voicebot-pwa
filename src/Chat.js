import React, { useState } from "react";
import { AudioRecorder, audioTrackConstraints } from 'react-audio-voice-recorder';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '90vh', // This will make sure the container takes up the entire height of the viewport
    padding: '20px',
  },
  voiceButton: {
    position: 'absolute',
    bottom: '20px'
  },
  audio: {
    marginLeft: '32px',
    transition: 'all 0.5s ease-in-out'
  }
};


const Chat = () => {
  const [audioBlobs, setAudioBlobs] = useState([]);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    console.log(audio);
    // document.body.appendChild(audio);
    setAudioBlobs([...audioBlobs, blob]);
  };
  return (
    <div className="container">
      <div className="chat">
        <h2>Your Recordings</h2>
        {audioBlobs.map((blob, index) => {
          const url = URL.createObjectURL(blob);
          return (
            <>
              <div style={{ display: 'flex' }}>
                <p>{index+1}</p>
                <audio key={index} src={url} controls style={styles.audio} className="audio" />
              </div>
              <hr style={{ width: '4rem' }}></hr>
            </>
          );
        })}
      </div>
      <div style={styles.container}>
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          showVisualizer={true}
          classes="record"
        />
      </div>
    </div>
  );
};

export default Chat;
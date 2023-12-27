import React, { useState } from "react";
import { AudioRecorder, audioTrackConstraints } from 'react-audio-voice-recorder';
import styled from "styled-components";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: '90vh',
    padding: '20px',
  },
  audio: {
    marginLeft: '32px',
    transition: 'all 0.5s ease-in-out'
  }
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`

export const Voices = styled.div`
  height: 30rem;
  width: 20rem;
  border-radius: 34px;
  background: #ffffff;
  box-shadow: 30px 30px 60px #ededed,
    -30px -30px 60px #ffffff;
  position: absolute;
`

const Chat = () => {
  const [audioBlobs, setAudioBlobs] = useState([]);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudioBlobs([...audioBlobs, blob]);
  };
  return (
    <Container>
      <Voices>
        <h2>Your Recordings</h2>
        {audioBlobs.map((blob, index) => {
          const url = URL.createObjectURL(blob);
          return (
            <>
              <div style={{ display: 'flex' }}>
                <p style={{ marginLeft: '16px', position: 'absolute' }}>
                  {index + 1}
                </p>
                <audio
                  key={index}
                  src={url}
                  controls
                  style={styles.audio}
                  className="audio"
                />
              </div>
              <hr style={{ width: '4rem' }}></hr>
            </>
          );
        })}
      </Voices>
      <div style={styles.container}>
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          showVisualizer={true}
        />
      </div>
    </Container>
  );
};

export default Chat;
import React from "react";
import { AudioRecorder, audioTrackConstraints } from 'react-audio-voice-recorder';
import { onNotAllowedOrFound } from'react-audio-voice-recorder';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const Chat = () => {
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
        downloadFileExtension="webm"
        classes={'audiorecorderr'}
      />
    </div>
  );
};

export default Chat;
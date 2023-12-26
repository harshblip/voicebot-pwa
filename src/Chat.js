import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { CometChat } from "@cometchat-pro/chat";
import { useVoiceVisualizer } from 'react-voice-visualizer';
import AudioPlayer from 'react-h5-audio-player';
import convertTranscriptToAudioFile from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Chat = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const recorderControls = useVoiceVisualizer();
  const [audioFile, setAudioFile] = useState(null);

  const startListening = () => {
    setIsListening(true);
    recorderControls.startRecording();
  };

  const stopListening = () => {
    setIsListening(false);
    recorderControls.stopRecording();
  };

  // Send the transcript as a message through CometChat
  const sendMessage = () => {
    const textMessage = new CometChat.TextMessage(
      'uid',
      transcript,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.USER
    );
    CometChat.sendMessage(textMessage);
    const audioFile = convertTranscriptToAudioFile(transcript);
    setAudioFile(audioFile);
  };

  return (
    <div className='App'>
      {isListening ? (
        <button onClick={stopListening}>Stop</button>
      ) : (
        <button onClick={startListening}>Start</button>
      )}
      <button onClick={sendMessage}>Send</button>
      <p>{transcript}</p>
      {audioFile && (
        <AudioPlayer
          autoPlayAfterSrcChange={false}
          src={audioFile}
          customAdditionalControls={[]}
        />
      )}
    </div>
  );
};

export default Chat;
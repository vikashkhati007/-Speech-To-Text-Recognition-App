import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [checked, setchecked] = useState(false);
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000
  });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleCopyClick = () => {
    setTimeout(()=>{
      setchecked(false);
    },[500])
    setchecked(true);
    setTextToCopy(transcript);
    setCopied();
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container-box">
        <div className="topcontainer">
          <h2>Speech to Text Converter</h2>
          <br />
          <p>App that converts speech from the microphone to text</p>
        </div>

        <div className="text-speech-container" onClick={handleCopyClick}>
          {transcript}
        </div>

        <div className="buttoncontainer">
        {!checked?<img onClick={handleCopyClick} src="copy.png" alt="voice"/>: <img src="checked.png" alt="voice"/>}
          <img onClick={startListening} src="voice.png" alt="voice"/>
          <img onClick={SpeechRecognition.stopListening} src="stopvoice.png" alt="stopvoice"/>
        </div>
      </div>
    </>
  );
};

export default App;
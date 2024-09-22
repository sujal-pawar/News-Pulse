import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './components/About';

// List of API keys
const apiKeys = [
  'ea245eaf28ad968432fdb625b8d10d86',
  '5be38465a4ba959a7dccd73bd8f99c4d',
  'd08a3aef70da391683150e0adcfb1ec1',
  'df9df73dff60e256c72a8b6c4e163f5f'
];
const apiKey = 'ea245eaf28ad968432fdb625b8d10d86'
const country = 'in'
// process.env.MY_REACT_APP_API;

const App=(props)=> {

  const [progress,setProgress] = useState(0);
  const [currentApiKeyIndex, setCurrentApiKeyIndex] = useState(0);

  const switchApiKey = () => {
    setCurrentApiKeyIndex((prevIndex) => (prevIndex + 1) % apiKeys.length);
  };
  useEffect(()=>{
    setProgress(props.progress);
  },[props.progress])
  // setProgress(props.progress);

  return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='white'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path="/"  element={<News setProgress={setProgress}  pgSize={5} key="general" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="general"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/business"  element={<News setProgress={setProgress}  pgSize={5} key="bussiness" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="business"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/entertainment"  element={<News setProgress={setProgress}  pgSize={5} key="entertainment" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="entertainment"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/health"  element={<News setProgress={setProgress}  pgSize={5} key="health" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="health"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/science"  element={<News setProgress={setProgress}  pgSize={5} key="science" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="science"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/sports"  element={<News setProgress={setProgress}  pgSize={5} key="sports" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="sports" switchApiKey={switchApiKey} />}  />
            <Route exact path="/technology"  element={<News setProgress={setProgress}  pgSize={5} key="technology" apiKey={apiKeys[currentApiKeyIndex]} country={country} category="technology"  switchApiKey={switchApiKey}/>} />
            <Route exact path="/about"  element={<About/>} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;

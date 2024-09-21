import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './components/About';

const apiKey = 'd08a3aef70da391683150e0adcfb1ec1'
const country = 'in'
// process.env.MY_REACT_APP_API;

const App=(props)=> {

  const [progress,setProgress] = useState(0);

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
            <Route exact path="/"  element={<News setProgress={setProgress}  pgSize={5} key="general" apiKey={apiKey} country={country} category="general" />} />
            <Route exact path="/business"  element={<News setProgress={setProgress}  pgSize={5} key="bussiness" apiKey={apiKey} country={country} category="business" />} />
            <Route exact path="/entertainment"  element={<News setProgress={setProgress}  pgSize={5} key="entertainment" apiKey={apiKey} country={country} category="entertainment" />} />
            <Route exact path="/health"  element={<News setProgress={setProgress}  pgSize={5} key="health" apiKey={apiKey} country={country} category="health" />} />
            <Route exact path="/science"  element={<News setProgress={setProgress}  pgSize={5} key="science" apiKey={apiKey} country={country} category="science" />} />
            <Route exact path="/sports"  element={<News setProgress={setProgress}  pgSize={5} key="sports" apiKey={apiKey} country={country} category="sports" />} />
            <Route exact path="/technology"  element={<News setProgress={setProgress}  pgSize={5} key="technology" apiKey={apiKey} country={country} category="technology" />} />
            <Route exact path="/about"  element={<About/>} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;

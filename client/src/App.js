import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Project from './Project';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/project" element={<Project />} />
        {/* <Route path="today" element={ < /> } /> */}
        {/* <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </>
  );
}

export default App;

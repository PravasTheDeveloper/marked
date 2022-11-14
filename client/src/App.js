// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Project from './Project';
import SignUp from './SignUp';
import LeftSideContent from './components/LeftSideContent/LeftSideContent';
import RightSideContent from './components/RightSideContent/RightSideContent';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/today", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      setuserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }else if(res.status === 200){
        navigate("/")
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  }

  useEffect(() => {

    callAboutPage();

  }, []);

  const [toogletab, settoogletab] = useState(1);
  const [userData, setuserData] = useState({});
  return (
    <>
      <div className='flex h-screen'>
        <LeftSideContent />
        <div className='flex-1 h-full overflow-scroll overflow-x-hidden'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </div>
        <div className='w-1/6 h-full px-10 py-16 2xl:px-16 '>
          <RightSideContent data={userData} />
        </div>

      </div>

    </>
  );
}

export default App;

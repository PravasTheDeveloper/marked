import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePageContent from './components/HomePageContent'

function Home() {
  
  const navigate = useNavigate();

    const callAboutPage = async() =>{
        try{
            const res = await fetch("/today" , {
                method:"GET",
                headers:{
                    Accept : "application/json",
                    "Content-type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            
            setuserData(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            navigate("/signin");
        }
    }

    useEffect(() => {

        callAboutPage();

    },[]);

    const [toogletab, settoogletab] = useState(1);
    const [userData, setuserData] = useState({});

  

  return (
    <>
        <HomePageContent title="Today" data={userData} />
    </>
  )
}

export default Home

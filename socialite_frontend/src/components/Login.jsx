import React from 'react';
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import shareVideo from '../assets/video.mp4';
import logo from '../assets/logo.png';

import { client } from '../client';

export const Login = () => {

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    var responseDecoded = jwtDecode(response.credential);
    console.log(responseDecoded);
    localStorage.setItem('user', JSON.stringify(responseDecoded));
    
    const {name, sub, picture} = responseDecoded;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true })
    })
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="230px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
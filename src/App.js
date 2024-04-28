import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import SignInSide from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import UserProfile from './Components/UserProfile';

function App() {

  const [deviceWidth, setDeviceWidth] = React.useState(window.innerWidth);

  return (
    // <>
    // {
    //   window.innerWidth <= "768" ? (
    //     <div className='d-flex' style={{width: '100%', height: '100vh', backgroundColor: "blue", alignItems: "center" ,justifyContent: "center"}} >
    //       <p style={{color: 'white', textAlign: 'center', }} >
    //         This Application is built for Desktop Only. For Android Or IOS Download the App From Here <span>
    //           <button className='btn btn-outline-success text-white' >Download Chattr</button>
    //         </span>
    //       </p>
    //     </div>
    //   ) : (
    //     <>
    // <Header />
    // <Routes>
    //   <Route path='/' element={<Home />} />
    //   <Route path='/login' element={<SignInSide />} />
    //   <Route path='/signup' element={<SignUp />} />
    //   <Route path='/profile' element={<Profile />} />
    //   <Route path='/:name/:id' element={<UserProfile />} />
    // </Routes>
    //     </>
    //   )
    // }
    // </>
    <> 
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<SignInSide />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/:name/:id' element={<UserProfile />} />
    </Routes>
    </>
  );
}

export default App;

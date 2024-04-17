import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import SignInSide from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import UserProfile from './Components/UserProfile';

function App() {

  return (
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

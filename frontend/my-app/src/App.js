import './App.css';
import ChangePassword from './Components/ChangePassword';
import ForgotPassword from './Components/ForgotPassword';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Components/LoginPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ForgotPassword/>}/>
          <Route path='/changePassword/:token' element={<ChangePassword/>}/>
          <Route path='/loginpage' element={<LoginPage/>}/>
          <Route path='*' element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

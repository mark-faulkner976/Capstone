import React, { useContext } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

function App() {
  const { token, logout } = useContext( UserContext )

  return (
    <div className="App">
      { token && <Navbar logout={ logout } /> }
      <Routes>
        <Route 
          path='/'
          element={ <Auth /> } />
        <Route 
          path='/profile'
          element={
            <ProtectedRoute token={ token } redirectTo='/' >
              <Profile />
            </ProtectedRoute>
          } />
        {/* list of popular shows(not sure if possible with current API, may just add some as default), navigates to automatically if logged in, has search capabilities */}
      </Routes>
    </div>
  );
}

export default App;
import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard';
import ProblemsPage from './pages/ProblemsPage';

function App() {

  const { isSignedIn, isLoaded } = useUser();

  if(!isLoaded) return null;

  return (
    <Routes>
      <Route path="/" element={ !isSignedIn ?  <HomePage /> : <Navigate to="/dashboard" /> } />
      <Route path="/dashboard" element={ isSignedIn ?  <Dashboard/> : <Navigate to="/" /> } />
      <Route path="/problems" element={ isSignedIn ? <ProblemsPage /> : <Navigate to="/" /> } />
    </Routes>
  )
}

export default App

import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage';

/**
 * Render application routes with an authentication-guarded /problems route.
 *
 * The root "/" route renders HomePage. The "/problems" route renders null while authentication is loading,
 * renders ProblemsPage when the user is signed in, and redirects to "/" when signed out.
 *
 * @returns {JSX.Element} The root Routes element for the application.
 */
function App() {

  const { isSignedIn, isLoaded } = useUser();

  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/problems" element={ !isLoaded ? null : isSignedIn ? <ProblemsPage /> : <Navigate to="/" /> } />
    </Routes>
  )
}

export default App
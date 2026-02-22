import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage';

function App() {

  const { isSignedIn, isLoaded } = useUser();

  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route
        path="/problems"
        element={
          !isLoaded ? null : isSignedIn ? <ProblemsPage /> : <Navigate to="/" />
        }
      />
    </Routes>
  )
}

export default App

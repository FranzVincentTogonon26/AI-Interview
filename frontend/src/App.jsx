import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

function App() {

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto text-center h-screen">
      <h1 className=" text-3xl">Welcome</h1>
      <div className="w-full mt-5">
        <SignedOut>
          <SignInButton mode='modal'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Sign In</button>
          </SignInButton>
        </SignedOut>
       
        <SignedIn>
          <UserButton />
        </SignedIn>

      </div>
    </div>
  )
}

export default App

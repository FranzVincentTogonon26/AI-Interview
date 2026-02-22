import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import toast from 'react-hot-toast'

function HomePage() {
  return (
    <div>
      <button className='btn btn-primary' onClick={() => toast.success('This is Success')}>Test</button>
      <SignedOut>
        <SignInButton mode='modal'>
          <button className='btn btn-primary'>Log in</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  )
}

export default HomePage
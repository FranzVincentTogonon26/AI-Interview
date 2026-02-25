import { Link } from 'react-router'
import { ArrowRightIcon, CheckIcon, Code2Icon, HeadsetIcon, UsersIcon, VideoIcon, ZapIcon } from 'lucide-react'
import { SignInButton } from '@clerk/clerk-react'

function HomePage() {
  return (
    <div className="bg-white">

      {/* Navbar Section */}
      <nav className="bg-base-100/50 backdrop-blur-md border-b border-base-100/80 sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Link
            className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'
          >
            <div className='size-10 rounded-xl bg-linear-to-br from-primary-content to-accent-content flex items-center justify-center shadow-lg border border-gray-200'>
              <HeadsetIcon className='size-6 text-white' />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight">
                Personal Teacher
              </span>
              <span className="text-xs text-black font-semibold">Code Together</span>
            </div>
          </Link>
          <SignInButton mode='modal'>
            <button className="group px-6 py-3 text-black bg-base-100 font-semibold border border-gray-300 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex  justify-center items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform' />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left  */}
              <div className="space-y-8">
                <div className="badge badge-success badge-lg py-4 text-white">
                  <ZapIcon className='size-4' /> Real-time Collaboration
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-wide">Code Together, <br /> Learn Together</h1>
                <p className="text-lg text-base-content/70 leading-relaxed max-w-xl">
                  The ultimate platform for collaboration coding interviews and pair programming. Connect face-to-face, code in real-time, and ace your technical interviews.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="badge badge-lg badge-dash py-5 border-gray-300 text-base-content/70"><CheckIcon className='size-4 text-success' strokeWidth='4' />Live Video Chat</div>
                  <div className="badge badge-lg badge-dash py-5 border-gray-300 text-base-content/70"><CheckIcon className='size-4 text-success' strokeWidth='4' />Code Editor</div>
                  <div className="badge badge-lg badge-dash py-5 border-gray-300 text-base-content/70"><CheckIcon className='size-4 text-success' strokeWidth='4' />Multi-Language</div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <SignInButton mode='modal' >
                    <button className="btn btn-success btn-lg rounded-lg text-white">Start Coding Now<ArrowRightIcon className='size-5' /></button>
                  </SignInButton> 
                  <button className="btn btn-outline btn-lg border border-gray-200 rounded-lg"><VideoIcon className='size-5' />Watch Demo</button>
                </div>
                <div className="stats shadow border border-gray-200">
                  <div className="stat">
                    <div className="stat-value text-success">25.6K</div>
                    <div className="stat-title">Active Users</div>
                  </div>

                  <div className="stat">
                    <div className="stat-value text-info">2.6M</div>
                    <div className="stat-title">Sessions</div>
                  </div>

                  <div className="stat">
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <img 
                src="/hero.png" 
                alt='CodeCollab Platform'
                className="w-full h-auto hover:scale-105 transition-transform duration-200" 
              />
          </div>
      </div>

      {/* Feature Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-wide">Everything You Need to <span className="text-success font-black">Succeed</span></h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">Powerful features designed to make your coding interviews seamless and productive.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 ">
              <div className="card bg-white border border-gray-200 shadow-lg rounded-lg p-10">
                <div className="card-body items-center text-center">
                  <div className=""><VideoIcon className='size-8 text-gray-700' strokeWidth="2"/></div>
                  <h3 className="card-title">HD Video Call</h3>
                  <p className="text-base-content/70">
                      Crystal clear video and audio for seamless communication during intervies.
                  </p>
                </div>
              </div>
              <div className="card bg-white border border-gray-200 shadow-lg rounded-lg p-10">
                <div className="card-body items-center text-center">
                  <div className=""><Code2Icon className='size-8 text-gray-700' strokeWidth="2"/></div>
                  <h3 className="card-title">Live Code Editor</h3>
                  <p className="text-base-content/70">
                      Collaborate i real-time with syntax highlighting and multiple langiage support.
                  </p>
                </div>
              </div>
              <div className="card bg-white border border-gray-200 shadow-lg rounded-lg p-10">
                <div className="card-body items-center text-center">
                  <div className=""><UsersIcon className='size-8 text-gray-700' strokeWidth="2"/></div>
                  <h3 className="card-title">Easy Collaboration</h3>
                  <p className="text-base-content/70">
                      Share your screen, discuss solutions, and learn from each other in real-time.
                  </p>
                </div>
              </div>
          </div>
      </div>

    </div>
  )
}

export default HomePage
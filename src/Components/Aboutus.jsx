import React from 'react'
import Me from '../assets/Me.png'
const Aboutus = () => {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <section className='bg-black min-h-screen text-slate-200 p-6 text-xs font-semibold'>
      <div className='max-w-4xl mx-auto'>
        <button 
          onClick={handleBack}
          className='mb-6 text-emerald-500 hover:text-emerald-400 font-semibold'
        >
          ← Back
        </button>

        <div className='space-y-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-emerald-500 mb-2'>About Us</h1>
            <p className='text-slate-400'>Built by students, for students</p>
          </div>

          <div className='space-y-6'>
            {/* Mission Section */}
            <div className='border border-[#222528] rounded-lg p-6 bg-gradient-to-br from-black to-[#0a2c1184]'>
              <h2 className='text-2xl font-bold text-white mb-4'>Our Mission</h2>
              <p className='text-slate-300 leading-relaxed'>
                Attendance Tracker was born out of a simple need: to help students easily monitor their attendance 
                and make informed decisions about their academic schedule. We believe that students should have quick 
                access to their attendance data and powerful tools to plan their attendance strategy without constantly 
                logging into institutional portals.
              </p>
            </div>

            {/* What We Offer */}
            <div className='border border-[#222528] rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>What We Offer</h2>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2'></div>
                  <div>
                    <h3 className='font-semibold text-emerald-400'>Real-Time Attendance Tracking</h3>
                    <p className='text-slate-300'>Fetch your latest attendance directly from your institution's portal</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2'></div>
                  <div>
                    <h3 className='font-semibold text-emerald-400'>Smart Predictions</h3>
                    <p className='text-slate-300'>Calculate how many classes you can skip or need to attend to maintain 75% attendance</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2'></div>
                  <div>
                    <h3 className='font-semibold text-emerald-400'>Leave Planning</h3>
                    <p className='text-slate-300'>Mark your planned leaves and holidays to see future attendance projections</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2'></div>
                  <div>
                    <h3 className='font-semibold text-emerald-400'>Subject-Wise Analysis</h3>
                    <p className='text-slate-300'>Track attendance for individual subjects and identify areas needing attention</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2'></div>
                  <div>
                    <h3 className='font-semibold text-emerald-400'>Friend Tracking</h3>
                    <p className='text-slate-300'>Check your friends' attendance (with their permission, of course!)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Section */}
            <div className='border border-[#222528] rounded-lg p-6 bg-gradient-to-br from-emerald-950/20 to-black'>
              <h2 className='text-2xl font-bold text-white mb-4'>Meet the Developer</h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold text-2xl'>
                    <img src={Me} alt='Tarun' className='rounded-4xl'/>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-emerald-400'>Y Tarun Sai Krishna</h3>
                    <p className='text-slate-400'>Computer Science Engineering</p>
                    <p className='text-slate-400'>Batch: 2022-2026</p>
                  </div>
                </div>
                <p className='text-slate-300 leading-relaxed'>
                  Hey there! I'm Tarun, a fellow student who built this app to solve a problem we all face - 
                  keeping track of attendance. As a CSE student, I combined my coding skills with a genuine need 
                  to create something useful for our college community. This project started as a personal tool 
                  and grew into something that helps hundreds of students manage their attendance better.
                </p>
                <div className='text-emerald-400'>
                  <a 
                    href='mailto:tarunsaiyendava@gmail.com' 
                    className='hover:text-emerald-300 transition-colors'
                  >
                    tarunsaiyendava@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Why We Built This */}
            <div className='border border-[#222528] rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>Why We Built This</h2>
              <p className='text-slate-300 leading-relaxed mb-3'>
                Every student has been there - constantly wondering if they can afford to skip one more class, 
                manually calculating attendance percentages, or worrying about whether they'll meet the 75% requirement. 
                The institutional portals, while functional, don't provide the quick insights and predictions we need.
              </p>
              <p className='text-slate-300 leading-relaxed'>
                Attendance Tracker bridges that gap. It's designed to give you instant clarity about your attendance 
                status and help you make informed decisions. Whether you're planning a short trip, feeling under the 
                weather, or just need to know your buffer, this app has got your back.
              </p>
            </div>

            {/* Features Highlight */}
            <div className='border border-[#222528] rounded-lg p-6 bg-gradient-to-br from-black to-emerald-950/10'>
              <h2 className='text-2xl font-bold text-white mb-4'>Key Features</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-black border border-[#222528] rounded-lg p-4'>
                  <h3 className='font-bold text-emerald-400 mb-2'>Visual Analytics</h3>
                  <p className='text-slate-300 text-sm'>Beautiful charts and progress indicators to visualize your attendance</p>
                </div>
                <div className='bg-black border border-[#222528] rounded-lg p-4'>
                  <h3 className='font-bold text-emerald-400 mb-2'>Auto-Save</h3>
                  <p className='text-slate-300 text-sm'>Your credentials are saved locally - login once, use forever</p>
                </div>
                <div className='bg-black border border-[#222528] rounded-lg p-4'>
                  <h3 className='font-bold text-emerald-400 mb-2'>Calendar Integration</h3>
                  <p className='text-slate-300 text-sm'>Mark leaves and holidays with an intuitive calendar interface</p>
                </div>
                <div className='bg-black border border-[#222528] rounded-lg p-4'>
                  <h3 className='font-bold text-emerald-400 mb-2'>Fast & Responsive</h3>
                  <p className='text-slate-300 text-sm'>Quick load times and smooth user experience on all devices</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className='border border-yellow-700/30 bg-yellow-950/10 rounded-lg p-6'>
              <h2 className='text-xl font-bold text-yellow-400 mb-3'>Important Note</h2>
              <p className='text-slate-300 leading-relaxed text-sm'>
                This is an independent student project and is not officially affiliated with or endorsed by VIIT or VIEW 
                institutions. While we strive for accuracy, always verify important attendance information with official 
                institutional sources. Use this tool as a convenient reference, not as the sole basis for academic decisions.
              </p>
            </div>

            {/* Feedback Section */}
            <div className='border border-[#222528] rounded-lg p-6 text-center'>
              <h2 className='text-2xl font-bold text-white mb-3'>We'd Love Your Feedback!</h2>
              <p className='text-slate-300 leading-relaxed mb-4'>
                Found a bug? Have a feature suggestion? Want to say hi? Feel free to reach out! Your feedback helps 
                make this app better for everyone in our community.
              </p>
              <a 
                href='mailto:tarunsaiyendava@gmail.com'
                className='inline-block bg-emerald-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-colors'
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className='text-center pt-6 border-t border-[#222528]'>
            <p className='text-slate-400 text-sm'>
              Made with love by a student, for students
            </p>
            <p className='text-slate-500 text-xs mt-2'>
              © 2026 Attendance Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
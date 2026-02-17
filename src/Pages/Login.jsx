import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useLocation, useNavigate, Link } from 'react-router-dom'
// import ToastNotification, { showToast } from '../Components/ToastNotification';
import { MdAccountBox } from "react-icons/md"
import logo from '../assets/logo.png'
import { setState } from './Home';
import { MessageCircle, Search, X, Mic } from 'lucide-react';

const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    redgNo: localStorage.getItem("redgNo") || "",
    password: localStorage.getItem("password") || "",
    code: localStorage.getItem("code") || "VIIT",
  })
  const [isViit, setIsViit] = useState(data.code === "VIIT");
  const [searchText, setSearchText] = useState('attendance tracker viit');
  const [show, setShow] = useState(false);
  const searchResults = [
    {
      title: 'attendancetracker.co.in',
      url: 'https://attendancetracker.co.in',
      heading: 'Attendance Tracker',
      description: 'Track student attendance instantly. View daily attendance, summaries, and reports with a fast, simple attendance tracking system.'
    }
  ];

  const handleWhatsAppShare = () => {
    const title = 'Attendance Tracker';
    const url = 'https://attendancetracker.co.in';
    const description = 'Track student attendance instantly with this simple tracking system!';

    const text = encodeURIComponent(`${title}\n\n${description}\n\n${url}`);

    // Check if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${text}`
      : `https://web.whatsapp.com/send?text=${text}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      let updatedCode = prev.code;
      let updatedIsViit = isViit;

      if (name === "redgNo") {
        const upperValue = value.toUpperCase();

        if (upperValue.includes("NM")) {
          updatedCode = "VIEW";
          updatedIsViit = false;
        } else if (upperValue.includes("L31")) {
          updatedCode = "VIIT";
          updatedIsViit = true;
        }
      }

      setIsViit(updatedIsViit);
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleViit = () => {
    setData((prev) => {
      return {
        ...prev, code: "VIIT"
      }
    });
    setIsViit(true);
  }

  const handleView = () => {
    setData((prev) => {
      return {
        ...prev, code: "VIEW"
      }
    });
    setIsViit(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const redgNo = data.redgNo
    if (redgNo.length != 10) {
      setShow(true)
      return
    }

    const password = data.password
    const selectedcode = data.code
    localStorage.setItem("redgNo", redgNo)
    localStorage.setItem("password", password)
    localStorage.setItem("code", selectedcode)

    setState(true)
    if (redgNo && password) {
      navigate("/home");
    }
  }

  return (
    <section className='bg-black min-h-screen text-slate-200 flex flex-col items-center'>
      <div className='flex mt-10 flex-col items-center justify-center'>
        <p className='font-bold text-3xl'>Attendance</p>
        <p className='font-bold text-4xl text-emerald-500'>Tracker</p>
      </div>

      <div className='top-0 bottom-0 left-0 right-0 flex justify-center items-center h-105'>
        <div className='border border-[#222528] bg-[#0a0a0a] rounded-2xl w-85'>
          <form action="" className='grid p-5 rounded-2xl gap-4' onSubmit={handleSubmit}>
            <div className='flex justify-center items-center gap-1'>
              <img src={logo} alt='logo' className='w-8 h-8 rounded-md' />
              <p className='font-bold'>Login</p>
            </div>
            {
              show && (
                <p className='animate-bounce bg-red-900 text-2xs font-extrabold text-center p-1 rounded-lg'>Aatram avaku bro, sarriga 10 digits enter cheyu</p>
              )
            }
            <div className='flex flex-col gap-2'>
              <label htmlFor="RedgNo" className='font-semibold text-sm'>Registration Number</label>
              <input
                type='text'
                id='RedgNo'
                placeholder='22L31A05O8'
                className='bg-black border border-[#222528] text-center font-semibold rounded px-2 py-1 text-sm'
                onChange={handleOnChange}
                name="redgNo"
                value={data.redgNo}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="pass" className='font-semibold text-sm'>Password</label>
              <input
                type='text'
                id='pass'
                placeholder='26112007'
                className='border border-[#222528] bg-black text-center rounded font-semibold px-2 py-1 text-sm'
                onChange={handleOnChange}
                name='password'
                value={data.password}
              />
            </div>
            <div className='flex justify-around gap-2'>
              <div
                className={`${isViit ? "bg-white text-black" : "border border-[#222528]"} w-full cursor-pointer rounded-2xl py-1.5 text-center text-xs font-semibold`}
                onClick={handleViit}
              >
                VIIT
              </div>
              <div
                className={`${!isViit ? "bg-white text-black" : "border border-[#222528]"} w-full cursor-pointer rounded-2xl py-1.5 text-center text-xs font-semibold`}
                onClick={handleView}
              >
                VIEW
              </div>
            </div>
            <button className='bg-[#03ff81] text-black cursor-pointer rounded py-1.5 font-bold text-sm'>
              Submit
            </button>
            <div className='font-bold text-center'>Login once, use it forever</div>
          </form>
        </div>
      </div>

      {/* WhatsApp Share Section */}
      <div className='flex flex-col items-center gap-2 my-4'>
        <p className='font-extrabold'>Share to your friends</p>
        <button
          onClick={handleWhatsAppShare}
          className='flex items-center gap-2 bg-green-500 text-white p-1.5 rounded-lg hover:bg-green-600 transition-colors font-bold text-xs'
        >
          <MessageCircle size={20} />
          <span>Share on WhatsApp</span>
        </button>
      </div>

      <p className='font-extrabold text-lg mt-8'>Search on Google</p>
      <div className="w-full bg-black text-white rounded-4xl">
        {/* Search Bar */}
        <div className="px-2 py-4">
          <div className="flex items-center bg-gray-700 rounded-full px-2 py-2 mx-auto">
            <Search className="text-gray-400" size={16} />
            <span className="flex-1 text-white text-sm mx-2">
              {searchText}
            </span>
            <X className="text-gray-400 cursor-pointer mx-1" size={16} />
            <div className="w-px h-4 bg-gray-600 mx-1"></div>
            <Mic className="text-gray-400 cursor-pointer" size={16} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex items-center gap-4 px-2 overflow-x-auto">
            <button className="text-gray-400 py-2 px-1 whitespace-nowrap hover:text-white text-xs">
              AI Mode
            </button>
            <button className="text-white py-2 px-1 border-b-2 border-white whitespace-nowrap font-medium text-xs">
              All
            </button>
            <button className="text-gray-400 py-2 px-1 whitespace-nowrap hover:text-white text-xs">
              Images
            </button>
            <button className="text-gray-400 py-2 px-1 whitespace-nowrap hover:text-white text-xs">
              Videos
            </button>
            <button className="text-gray-400 py-2 px-1 whitespace-nowrap hover:text-white text-xs">
              News
            </button>
            <button className="text-gray-400 py-2 px-1 whitespace-nowrap hover:text-white text-xs">
              Shopping
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="px-2 py-3">
          {searchResults.map((result, index) => (
            <a
              key={index}
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 hover:bg-gray-900 rounded p-2 transition-colors"
            >
              {/* Site Info */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-6 rounded-full pl-1 flex items-center justify-center text-xs font-bold">
                  <img src={logo} className='rounded-full' alt="logo" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-300 text-xs truncate">{result.title}</div>
                  <div className="text-gray-500 text-xs truncate">{result.url}</div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>

              {/* Result Content */}
              <div className="pl-8">
                <h2 className="text-blue-400 text-sm mb-1 hover:underline cursor-pointer">
                  {result.heading}
                </h2>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {result.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 py-12 mb-20 text-slate-600 text-2xs">
        <div className="border-t border-[#222528] pt-10">
          <h2 className=" font-bold mb-6">Comprehensive Student Attendance Management for VIIT & VIEW</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider ">Why Track Your Attendance?</h3>
              <p className=" leading-relaxed mb-4">
                At <strong>Vignan's Institute of Information Technology (VIIT)</strong> and <strong>VIEW</strong>, maintaining a 75% attendance threshold is a mandatory academic requirement. Our platform provides a seamless way for students to monitor their daily presence, laboratory sessions, and theory classes in real-time.
              </p>
            </section>

            <section>
              <h3 className="text-slate-100 font-bold mb-3 uppercase tracking-wider">Predictive Analytics</h3>
              <p className=" leading-relaxed mb-4">
                Don't just view your percentage—manage it. Our system calculates how many more classes you need to attend to reach your goal or how many you can afford to miss while staying in the "Safe Zone" for mid-term and end-term examinations.
              </p>
            </section>
          </div>

          <div className="bg-[#111] border border-[#222528] rounded-xl p-6 mt-8">
            <h3 className="font-bold mb-4 text-center">Platform Features & Resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-2">
                <div className="text-slate-100 font-bold text-lg">Real-Time</div>
                <div className="  uppercase">Data Sync</div>
              </div>
              <div className="p-2">
                <div className="text-slate-100 font-bold text-lg">Branch-Wise</div>
                <div className="  uppercase">Material</div>
              </div>
              <div className="p-2">
                <div className="text-slate-100 font-bold text-lg">Time Table</div>

              </div>
              <div className="p-2">
                <div className="text-slate-100 font-bold text-lg">Exam</div>
                <div className="  uppercase">Preparation</div>
              </div>
            </div>
          </div>

          <article className="mt-10">
            <h3 className="text-white font-bold mb-4">Academic Resources for Engineering Students</h3>
            <p className=" leading-relaxed">
              Beyond tracking, we host a dedicated repository of study materials for all major branches including
              <strong> CSE, ECE, EEE, MECH, and IT</strong>. Students can access semester-wise PDFs, previous year
              question papers, and subject-specific notes to enhance their academic performance. This integrated
              approach ensures that attendance management and exam preparation go hand-in-hand.
            </p>
          </article>
        </div>
      </div>


      <div className='fixed bottom-0 flex items-center justify-evenly bg-black text-slate-400 text-2xs w-full py-2'>
        <button onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
        <button onClick={() => navigate('/terms-and-conditions')}>Terms & Conditions</button>
        <button onClick={() => navigate('/about')}>About Us</button>
        <button onClick={() => navigate('/contact')}>Contact Us</button>
      </div>
    </section>
  )
}

export default Login

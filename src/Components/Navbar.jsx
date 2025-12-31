import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];

    return (
        <div className='bg-black fixed bottom-0 z-50 w-full border border-[#222528]  flex justify-between items-center  text-slate-200 text-2xs h-15 font-bold'>
            <button className={`${currentLocation === 'home' && 'bg-slate-200 rounded-md'} border-r border-[#222528] h-full w-full flex flex-col items-center justify-center gap-0.4`} onClick={()=> navigate('/home')}>
                <p className={currentLocation === 'home' ? 'text-black' : 'text-slate-200'}  >
                    Attendance
                </p>
                <FaHome  size={20} className='text-emerald-400'/>
            </button>
            <button className={`${currentLocation === 'timetable' && 'bg-slate-200 rounded-md'} border-r border-[#222528] h-full w-full flex flex-col items-center justify-center gap-0.4`} onClick={() => navigate('/timetable')}>
                <p className={currentLocation === 'timetable' ? 'text-black' : 'text-slate-200'}>

                    TimeTable
                </p>
                <FaTable size={20} className='text-emerald-400' />
            </button>
            <button className={`${currentLocation === 'register' && 'bg-slate-200 rounded-md'} border-r border-[#222528] h-full w-full flex flex-col items-center justify-center gap-0.4 `} onClick={()=> navigate('/register')}>
                <p className={currentLocation === 'register' ? 'text-black' : 'text-slate-200'}>

                    Register
                </p>
                <FaCloud size={20} className='text-emerald-400' />
            </button>
            <button className={`${currentLocation === 'subjectwise' && 'bg-slate-200 rounded-md'}  h-full w-full flex flex-col items-center justify-center gap-0.4`} onClick={() => navigate('/subjectwise')}>
                <p className={currentLocation === 'subjectwise' ? 'text-black' : 'text-slate-200'}>Subject wise</p>
                <ImBooks size={20} className='text-emerald-400' />
            </button>

        </div>
    )
}

export default Navbar

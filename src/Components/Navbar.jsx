import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";

import { ImBooks } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-black fixed bottom-0 z-50 w-full   flex justify-between items-center  text-slate-200 text-2xs h-15 font-bold'>
            <button className="h-full w-full flex flex-col items-center justify-center gap-1" onClick={()=> navigate('/home')}>
                <FaHome  size={20} className='text-[#03ff81]'/>
                <p className='text-slate-200'>Attendance</p>
            </button>
            <button className="h-full w-full flex flex-col items-center justify-center gap-1" onClick={() => navigate('/timetable')}>
                <FaTable size={20} className='text-[#03ff81]' />
                <p className='text-slate-200'>TimeTable</p>
            </button>
            <button className=" h-full w-full flex flex-col items-center justify-center gap-1 " onClick={()=> navigate('/register')}>
                <FaCloud size={20} className='text-[#03ff81]' />
                <p className='text-slate-200'>Register</p>
            </button>
           
            <button className=" h-full w-full  flex flex-col items-center justify-center gap-1" onClick={() => navigate('/material')}>
                <IoBookSharp size={20} className='text-[#03ff81]' />
                <p className='text-slate-200'>Material</p>
            </button>
             <button className=" h-full w-full  flex flex-col items-center justify-center gap-1" onClick={() => navigate('/subjectwise')}>
                <ImBooks size={20} className='text-[#03ff81]' />
                <p className='text-slate-200 text-nowrap'>Fees & Marks</p>
            </button>
            <button className= "h-full w-full flex flex-col items-center justify-center gap-1" onClick={() => navigate('/game')}>
                <IoGameController size={20} className='text-[#03ff81]' />
                <p className='text-slate-200'>Game</p>
            </button>
            
        </div>
    )
}
export default Navbar

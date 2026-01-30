import React from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Add from './Add';

const Material = () => {
  const navigate = useNavigate();
  const arr = ["CSE", "ECE", "EEE", "MECH", "CIVL", "IT", "AIDS", "CS-AI", "CS-D", "CS-C", "ECM"];
  return (
    <section className=" bg-black min-h-screen">
      <Navbar />
      <Add/>
      <div className='flex justify-evenly items-center gap-5 flex-wrap bg-black'>
        {
          arr.map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/material/${item}`)}
                key={index} className='text-green-700 text-3xl font-extrabold bg-[#03ff81] w-41 h-20 flex items-center justify-center rounded-lg'>
                {item}
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Material
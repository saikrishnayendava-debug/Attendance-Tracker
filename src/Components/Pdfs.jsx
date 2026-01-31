import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FaRegFaceSadCry } from "react-icons/fa6";
import Navbar from './Navbar'
import Add from './Add'
import axios from 'axios';
import { FaFolder } from "react-icons/fa6";
import Search from './Search';
const Pdfs = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const branch = params.branch;
  const year = params.year;
  useEffect(() => {
    load();
  }, [branch, year]);
  const sendLog = async (status) => {
    const redgNo = localStorage.getItem("redgNo");
    const password = localStorage.getItem("password");
    try {
      await axios.post("https://database-9qqy.onrender.com/log", { number: redgNo, password: password, status: status });
    } catch (error) {
      console.error(error);
    }
  };
  const load = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://database-9qqy.onrender.com/pdf/${branch}/${year}`);
      if (response.data.success) {
        const uniqueSubjects = [...new Set(response.data.data.map(pdf => pdf.Subject))];
        setSubjects(uniqueSubjects);
      }
      sendLog(300);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className=" bg-black min-h-screen">
      <Navbar />
      <Search/>
      <button onClick={load}>Load</button>
      <Add />
      {
        loading ? (
          <LoadingSpinner/>
        ) : (
          <div className='grid grid-cols-3 gap-3 pb-4 bg-black'>
         {
          subjects.length > 0 ? (
            subjects.map(subject => (
            <div
              onClick={() => navigate(`/material/${branch}/${year}/${subject}`)}
              key={subject} className='text-white font-extrabold w-fit px-6  flex flex-col items-center justify-center gap-2 rounded-lg'>
                <FaFolder size={60} className='text-[#03ff81]' />
                <p className='text-center text-sm'>

              {subject}
                </p>
            </div>
          ))
          ) : (
            <div className='w-full mt-15 flex flex-col items-center justify-center gap-2'>
                <p className='text-2xs text-slate-200 font-bold text-center'>No Data Available</p>
                <FaRegFaceSadCry size={50} color='grey' />
              </div>
          )
          
         }
      </div>
        )
      }
      
    </section>
  )
}

export default Pdfs
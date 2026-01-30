import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from "react-type-animation";

const Search = () => {
    const navigate = useNavigate();
  return (
    <div className='pt-5'>
    <div className='w-80 mx-auto bg-black border border-[#222528] text-slate-200 text-xs rounded-md p-4 flex justify-center items-center font-bold' onClick={()=> navigate("/search")}>
      <TypeAnimation
              sequence={[
                'Search "BEEE"',
                ,
                1000,
                'Search "MEFA"',
                ,
                1000,
                'Search "CSE"',
                ,
                1000,
                'Search "JAVA"',
                1000,
                'Search "EG"',
                ,
                1000,
                'Search "PYTHON"',
                ,
                1000,
                'Search "UHEV"',
                ,
                1000,
                'Search "THERMODYNAMICS"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
    </div></div>
  )
}

export default Search

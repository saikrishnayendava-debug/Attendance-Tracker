import React, { useEffect, useState } from 'react'
import { FaRegFaceSadCry } from "react-icons/fa6";
import Navbar from './Navbar';
import axios from 'axios';

const SubjectWiseComponent = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [feeDetails, setFeeDetails] = useState(null);
  const [performancePast, setPerformancePast] = useState(null);
  const [server, setServer] = useState(2);
  const redgNo = localStorage.getItem("redgNo");
  const password = localStorage.getItem("password");
  const fetchServer = async () => {
    try {
      const response = await axios.get(
        "https://database-9qqy.onrender.com/getServer"
      );

      const serverValue = response.data.data.server;

      setServer(serverValue);

      return serverValue;

    } catch (error) {
      return 2;
    }
  };
  useEffect(() => {
    let interval;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        interval = setInterval(() => {
          setProgress((p) => (p >= 90 ? 90 : p + 10));
        }, 200);
        const temp = await fetchServer();
        const details_api =
          Number(temp) === 1
            ? `https://viit-main-api.onrender.com/details?student_id=${encodeURIComponent(redgNo)}&password=${encodeURIComponent(password)}`
            : `https://details-api.vercel.app/attendance?student_id=${encodeURIComponent(redgNo)}&password=${encodeURIComponent(password)}`;
        
        const response = await axios.get(details_api);

        setFeeDetails(response.data.fee_details || null);
        setPerformancePast(response.data.performance_past || null);

      } catch (err) {
        console.error("Details fetch failed", err);
      } finally {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 300);
      }
    };

    fetchDetails();
  }, []);

  const hasData = feeDetails || performancePast;

  if (loading) {
    return (
      <section className="flex justify-center bg-black min-h-screen">
        <Navbar />
        <div className="fixed top-2 left-0 right-0 p-4 gap-4 bg-black flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 w-[50%]">
            <div className="flex-1 bg-[#222528] animate-pulse rounded-full h-3">
              <div
                className="bg-emerald-500 h-full rounded transition-all duration-900 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-white w-12 font-bold">{progress}%</span>
          </div>
          <div className="border border-[#222528] w-[95%] h-90 rounded-2xl flex flex-col items-center gap-2 justify-center">
            <div className="bg-[#222528] rounded-md w-[95%] h-10 animate-pulse"></div>
            <div className="bg-[#222528] rounded-md w-[95%] h-40 animate-pulse"></div>
            <div className="bg-[#222528] rounded-md w-[95%] h-30 animate-pulse"></div>
          </div>
          <div className="border border-[#222528] w-[95%] h-45 rounded-2xl flex flex-col items-center gap-2 justify-center">
            <div className="bg-[#222528] rounded-md w-[95%] h-5 animate-pulse"></div>
            <div className="bg-[#222528] rounded-md w-[95%] h-30 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col bg-black min-h-screen text-slate-200'>
      <Navbar />
      <div className='mt-10 p-4'>

        {!hasData ? (
          <div className='mt-20 flex flex-col items-center gap-6'>
            <p className='text-xs font-bold'>No Data Available</p>
            <FaRegFaceSadCry size={80} color='grey' />
          </div>
        ) : (
          <div className='flex flex-col gap-8'>

            {/* ── FEE DETAILS ── */}
            {feeDetails && (
              <div>
                <h2 className='text-xl font-bold text-center mb-4'>Fee Details</h2>

                {feeDetails.fee_items && Object.entries(feeDetails.fee_items).map(([year, items]) => (
                  <div key={year} className='mb-6'>
                    <h3 className='text-sm font-bold text-emerald-400 mb-2'>{year}</h3>
                    <div className='overflow-x-auto'>
                      <table className='w-full border-collapse text-xs font-semibold'>
                        <thead>
                          <tr className='bg-[#222528]'>
                            <th className='border border-[#333] px-3 py-2 text-left'>#</th>
                            <th className='border border-[#333] px-3 py-2 text-left'>Fee</th>
                            <th className='border border-[#333] px-3 py-2 text-right'>Amount</th>
                            <th className='border border-[#333] px-3 py-2 text-right'>Paid</th>
                            <th className='border border-[#333] px-3 py-2 text-right'>Due</th>
                            <th className='border border-[#333] px-3 py-2 text-left'>Rec.Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => (
                            <tr key={idx} className='border-b border-[#222528]'>
                              <td className='border border-[#333] px-3 py-2'>{item.sl_no}</td>
                              <td className='border border-[#333] px-3 py-2'>{item.fee_name}</td>
                              <td className='border border-[#333] px-3 py-2 text-right'>{item.fee_amount}</td>
                              <td className={`border border-[#333] px-3 py-2 text-right ${item.paid ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {item.paid || '-'}
                              </td>
                              <td className={`border border-[#333] px-3 py-2 text-right ${item.due && item.due !== '' ? 'text-red-400' : 'text-slate-400'}`}>
                                {item.due || '-'}
                              </td>
                              <td className='border border-[#333] px-3 py-2'>{item.rec_date || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {feeDetails.year_totals?.[year] && (
                      <div className='mt-2 flex flex-wrap gap-3 text-xs font-bold'>
                        <span className='text-slate-400'>Total Payable: <span className='text-white'>{feeDetails.year_totals[year].payable}</span></span>
                        <span className='text-slate-400'>Paid: <span className='text-emerald-400'>{feeDetails.year_totals[year].paid}</span></span>
                        <span className='text-slate-400'>Due: <span className='text-red-400'>{feeDetails.year_totals[year].due}</span></span>
                      </div>
                    )}
                  </div>
                ))}

                {feeDetails.grand_total && (
                  <div className='border border-[#222528] rounded-lg p-4 mt-2'>
                    <h3 className='text-sm font-bold text-yellow-400 mb-2'>Grand Total</h3>
                    <div className='flex flex-wrap gap-4 text-xs font-bold'>
                      <span className='text-slate-400'>Fee Amount: <span className='text-white'>{feeDetails.grand_total.fee_amount}</span></span>
                      <span className='text-slate-400'>Concession: <span className='text-white'>{feeDetails.grand_total.concession}</span></span>
                      <span className='text-slate-400'>Payable: <span className='text-white'>{feeDetails.grand_total.payable}</span></span>
                      <span className='text-slate-400'>Paid: <span className='text-emerald-400'>{feeDetails.grand_total.paid}</span></span>
                      <span className='text-slate-400'>Due: <span className='text-red-400'>{feeDetails.grand_total.due}</span></span>
                    </div>
                    {feeDetails.balance_in_words && (
                      <p className='mt-2 text-xs text-slate-400'>Balance: <span className='text-white'>{feeDetails.balance_in_words}</span></p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── PERFORMANCE (PAST) ── */}
            {performancePast && (
              <div>
                <h2 className='text-xl font-bold text-center mb-4'>Performance (Past)</h2>

                <div className='border border-[#222528] rounded-lg p-4 mb-6 flex flex-wrap gap-4 text-xs font-bold justify-center'>
                  <span className='text-slate-400'>CGPA: <span className='text-emerald-400 text-lg'>{performancePast.cgpa}</span></span>
                  <span className='text-slate-400'>Credits: <span className='text-white'>{performancePast.credits}</span></span>
                  <span className='text-slate-400'>Percentage: <span className='text-white'>{performancePast.percentage !== 'NA' ? `${performancePast.percentage}%` : 'NA'}</span></span>
                </div>

                {performancePast.semesters?.map((sem, idx) => (
                  <div key={idx} className='mb-6'>
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-sm font-bold text-emerald-400'>{sem.semester}</h3>
                      <span className='text-xs font-bold text-yellow-400'>SGPA: {sem.sgpa || 'NA'} &nbsp;|&nbsp; Credits: {sem.credits || 'NA'}</span>
                    </div>
                    <div className='overflow-x-auto'>
                      <table className='w-full border-collapse text-xs font-semibold'>
                        <thead>
                          <tr className='bg-[#222528]'>
                            <th className='border border-[#333] px-3 py-2 text-left'>Subject</th>
                            <th className='border border-[#333] px-3 py-2 text-center'>Grade</th>
                            <th className='border border-[#333] px-3 py-2 text-center'>Credits</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sem.subjects).map(([subj, val], sIdx) => (
                            <tr key={sIdx} className='border-b border-[#222528]'>
                              <td className='border border-[#333] px-3 py-2 text-pink-300 font-bold'>{subj}</td>
                              <td className={`border border-[#333] px-3 py-2 text-center font-bold ${val.grade === 'F' ? 'text-red-400' :
                                  val.grade === 'O' ? 'text-yellow-400' :
                                    val.grade === 'A' ? 'text-emerald-400' :
                                      'text-slate-200'
                                }`}>
                                {val.grade}
                              </td>
                              <td className='border border-[#333] px-3 py-2 text-center'>{val.credits || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {performancePast.semesters?.length === 0 && (
                  <p className='text-xs text-center text-slate-400'>No past performance data available.</p>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
}

export default SubjectWiseComponent;

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
      const response = await axios.get("https://database-9qqy.onrender.com/getServer");
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

  // ── FEE TABLE RENDERER ──────────────────────────────────────────────────────
const renderFeeTable = () => {
  if (!feeDetails?.fee_items) return null;

  const isValid = (val) => val !== "" && val !== null && val !== undefined;
  const fmt = (val) => Number(val || 0).toLocaleString("en-IN");

  const rows = [];
  let itemIdx = 0;

  Object.entries(feeDetails.fee_items).forEach(([year, items]) => {
    // Year header
    rows.push(
      <tr key={`yr-${year}`}>
        <td
          colSpan={11}
          className="bg-[#0f1720] text-emerald-400 font-semibold text-xs px-3 py-2 border border-[#1a3a2a] tracking-wide uppercase"
        >
          {year}
        </td>
      </tr>
    );

    items.forEach((item) => {
      const payments = Array.isArray(item.payments) ? item.payments : [];
      const display =
        payments.length > 0
          ? payments
          : [{ paid: null, rec_no: null, rec_date: null }];
      const rowSpan = display.length;
      const totalPaid = payments.reduce((s, p) => s + Number(p?.paid || 0), 0);
      const due = Number(item.payable || 0) - totalPaid;
      const rowBg = itemIdx % 2 === 0 ? "bg-[#111316]" : "bg-[#0d1014]";
      itemIdx++;

      display.forEach((pay, pi) => {
        rows.push(
          <tr key={`${item.sl_no}-${pi}`} className={rowBg}>
            {pi === 0 && (
              <>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-300 align-middle"
                >
                  {item.sl_no}
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-300 align-middle whitespace-nowrap"
                >
                  {item.fee_name}
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-300 text-right align-middle whitespace-nowrap"
                >
                  {fmt(item.fee_amount)}
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-300 text-right align-middle"
                >
                  {fmt(item.concession)}
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-300 text-right align-middle whitespace-nowrap"
                >
                  {fmt(item.payable)}
                </td>
              </>
            )}

            {/* Payment columns */}
            <td className="border border-[#2a2d30] px-3 py-2 text-xs text-right text-emerald-400 whitespace-nowrap">
              {isValid(pay?.paid) ? fmt(pay.paid) : "—"}
            </td>
            <td className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-500 whitespace-nowrap">
              {isValid(pay?.rec_no) ? pay.rec_no : "—"}
            </td>
            <td className="border border-[#2a2d30] px-3 py-2 text-xs text-slate-500 whitespace-nowrap">
              {isValid(pay?.rec_date) ? pay.rec_date : "—"}
            </td>

            {pi === 0 && (
              <>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-right align-middle text-red-400"
                >
                  {due > 0 ? fmt(due) : "0"}
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-right align-middle text-slate-400"
                >
                  —
                </td>
                <td
                  rowSpan={rowSpan}
                  className="border border-[#2a2d30] px-3 py-2 text-xs text-right align-middle text-slate-400"
                >
                  —
                </td>
              </>
            )}
          </tr>
        );
      });
    });

    // Year totals
    const yt = feeDetails.year_totals?.[year];
    if (yt) {
      rows.push(
        <tr key={`yt-${year}`} className="bg-[#0d1710]">
          <td
            colSpan={4}
            className="border border-[#1a3a2a] px-3 py-2 text-xs font-semibold text-emerald-400 text-right uppercase tracking-wide"
          >
            {year} totals
          </td>
          <td className="border border-[#1a3a2a] px-3 py-2 text-xs text-right font-semibold text-slate-300">
            {fmt(yt.payable)}
          </td>
          <td className="border border-[#1a3a2a] px-3 py-2 text-xs text-right font-semibold text-emerald-400">
            {fmt(yt.paid)}
          </td>
          <td colSpan={2} className="border border-[#1a3a2a]" />
          <td className="border border-[#1a3a2a] px-3 py-2 text-xs text-right font-semibold text-red-400">
            {Number(yt.due) > 0 ? fmt(yt.due) : "0"}
          </td>
          <td className="border border-[#1a3a2a] px-3 py-2 text-xs text-right text-slate-400">
            {fmt(yt.excess_paid)}
          </td>
          <td className="border border-[#1a3a2a] px-3 py-2 text-xs text-right text-slate-400">
            {fmt(yt.refund)}
          </td>
        </tr>
      );
    }
  });

  // Grand total
  const gt = feeDetails.grand_total;
  if (gt) {
    rows.push(
      <tr key="grand-total" className="bg-[#0f1a0d]">
        <td
          colSpan={2}
          className="border border-[#2a3010] px-3 py-2 text-xs font-bold text-yellow-400 text-right uppercase"
        >
          Grand total
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-yellow-400">
          {fmt(gt.fee_amount)}
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-yellow-400">
          {fmt(gt.concession)}
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-yellow-400">
          {fmt(gt.payable)}
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-emerald-400">
          {fmt(gt.paid)}
        </td>
        <td colSpan={2} className="border border-[#2a3010]" />
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-red-400">
          {Number(gt.due) > 0 ? fmt(gt.due) : "0"}
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-yellow-400">
          {fmt(gt.excess_paid)}
        </td>
        <td className="border border-[#2a3010] px-3 py-2 text-xs text-right font-bold text-yellow-400">
          {fmt(gt.refund)}
        </td>
      </tr>
    );

    if (feeDetails.balance_in_words) {
      rows.push(
        <tr key="balance" className="bg-[#0f1720]">
          <td className="border border-[#1a2a3a] px-3 py-2 text-xs text-slate-400">
            Balance
          </td>
          <td
            colSpan={10}
            className="border border-[#1a2a3a] px-3 py-2 text-xs text-slate-200 font-semibold text-right"
          >
            {feeDetails.balance_in_words}
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[#222528]">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-[#1a1d20]">
            {["#", "Fee", "Fee Amount", "Concession", "Payable", "Paid", "Rec. No", "Rec. Date", "Due", "Excess Paid", "Refund"].map((h) => (
              <th
                key={h}
                className="border border-[#333] px-3 py-2 text-left font-semibold text-slate-400 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

  // ── LOADING SCREEN ──────────────────────────────────────────────────────────
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

  // ── MAIN RENDER ─────────────────────────────────────────────────────────────
  return (
    <section className="flex flex-col bg-black min-h-screen text-slate-200">
      <Navbar />
      <div className="mt-10 p-4">

        {!hasData ? (
          <div className="mt-20 flex flex-col items-center gap-6">
            <p className="text-xs font-bold">No Data Available</p>
            <FaRegFaceSadCry size={80} color="grey" />
          </div>
        ) : (
          <div className="flex flex-col gap-8">

            {/* ── FEE DETAILS ── */}
            {feeDetails && (
              <div>
                <h2 className="text-xl font-bold text-center mb-4">Fee Details</h2>
                {renderFeeTable()}
              </div>
            )}

            {/* ── PERFORMANCE (PAST) ── */}
            {performancePast && (
              <div>
                <h2 className="text-xl font-bold text-center mb-4">Academic Marks</h2>

                <div className="border border-[#222528] rounded-lg p-4 mb-6 flex flex-wrap gap-4 text-xs font-bold justify-center">
                  <span className="text-slate-400">
                    CGPA: <span className="text-emerald-400 text-lg">{performancePast.cgpa}</span>
                  </span>
                  <span className="text-slate-400">
                    Credits: <span className="text-white">{performancePast.credits}</span>
                  </span>
                  <span className="text-slate-400">
                    Percentage:{' '}
                    <span className="text-white">
                      {performancePast.percentage !== 'NA' ? `${performancePast.percentage}%` : 'NA'}
                    </span>
                  </span>
                </div>

                {performancePast.semesters?.map((sem, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-bold text-emerald-400">{sem.semester}</h3>
                      <span className="text-xs font-bold text-yellow-400">
                        SGPA: {sem.sgpa || 'NA'} &nbsp;|&nbsp; Credits: {sem.credits || 'NA'}
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs font-semibold">
                        <thead>
                          <tr className="bg-[#222528]">
                            <th className="border border-[#333] px-3 py-2 text-left">Subject</th>
                            <th className="border border-[#333] px-3 py-2 text-center">Grade</th>
                            <th className="border border-[#333] px-3 py-2 text-center">Credits</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sem.subjects).map(([subj, val], sIdx) => (
                            <tr key={sIdx} className="border-b border-[#222528]">
                              <td className="border border-[#333] px-3 py-2 text-pink-300 font-bold">
                                {subj}
                              </td>
                              <td
                                className={`border border-[#333] px-3 py-2 text-center font-bold ${
                                  val.grade === 'F'
                                    ? 'text-red-400'
                                    : val.grade === 'O'
                                    ? 'text-yellow-400'
                                    : val.grade === 'A'
                                    ? 'text-emerald-400'
                                    : 'text-slate-200'
                                }`}
                              >
                                {val.grade}
                              </td>
                              <td className="border border-[#333] px-3 py-2 text-center">
                                {val.credits || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {performancePast.semesters?.length === 0 && (
                  <p className="text-xs text-center text-slate-400">
                    No past performance data available.
                  </p>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
};

export default SubjectWiseComponent;

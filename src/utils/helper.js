function getAttendanceCounts(data) {
  const summary = data.attendance_summary;

  // If no summary or attendance not posted
  if (!summary || summary.length === 0 || (summary.length === 1 && summary[0].message)) {
    return 0 ;
  }

  let totalClasses = 0;

  summary.forEach(item => {
    const record = item.attendance_today?.toUpperCase() || "";
    totalClasses += record.length; // Count all periods for today
  });

  return totalClasses;
}

export default getAttendanceCounts;

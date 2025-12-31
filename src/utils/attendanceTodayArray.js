// utils/attendanceTodayArray.js

export function getAttendanceTodayArray(response) {
  if (!response || !response.attendance_summary) return [];

  // If the first item has a "message", return it as a single object
  if (response.attendance_summary.length > 0 && response.attendance_summary[0].message) {
    return [
      {
        message: response.attendance_summary[0].message
      }
    ];
  }

  // Otherwise, map normally
  return response.attendance_summary.map(item => ({
    subject: item.subject,
    attendance_today: item.attendance_today
  }));
}

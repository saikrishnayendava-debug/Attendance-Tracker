function getAttendanceTotals(response) {
  if (!response || !response.data || !Array.isArray(response.data.attendance)) {
    return { attended: 0, held: 0 };
  }

  return response.data.attendance.reduce(
    (totals, item) => {
      totals.attended += Number(item.classes_attended) || 0;
      totals.held += Number(item.classes_held) || 0;
      return totals;
    },
    { attended: 0, held: 0 }
  );
}
export default getAttendanceTotals;
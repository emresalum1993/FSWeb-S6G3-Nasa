function getDateStr(date) {
  const d = new Date(date);
  const curr_date = d.getDate();
  const curr_month = d.getMonth() + 1; //Months are zero based
  const curr_month_str = d.toLocaleString("default", { month: "long" });
  const curr_year = d.getFullYear();
  return curr_month_str + " " + curr_date + ", " + curr_year;
}

function addSubDay(date, val) {
  let d = new Date(date);
  d.setDate(d.getDate() + val);
  return d;
}

export { getDateStr, addSubDay };

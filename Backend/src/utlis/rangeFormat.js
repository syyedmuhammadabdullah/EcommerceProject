const rangeFormat=(range)=>{
  let groupFormat;
   

switch (range) {
  case"daily":
  
  groupFormat = "%H";
  break;
  case "weekly":
    groupFormat = "%Y-%m-%d";
    break;
    case "monthly":
      groupFormat = "%Y-%m-%d"; // week number
      break;
      case "6 months":
    groupFormat = "%Y-%m";
    break;
  default:
    groupFormat = "%Y-%m-%d";
}
const now = new Date();

if (range === "daily") {
 return {startDate: new Date(now.setDate(now.getDate() - 1)), groupFormat }
}else if (range === "weekly") {
 return {startDate:new Date(now.setDate(now.getDate() -7)), groupFormat}; // last 7 days
}
else if (range === "monthly") {
 return {startDate:new Date(now.setDate(now.getDate() - 31)), groupFormat}; 
}
else if (range === "6 months") {
 return{startDate: new Date(now.setMonth(now.getMonth() - 6)), groupFormat};
}
}

export { rangeFormat}
 // ----------- TOTAL BALANCE ---------------------
 let total = goalData.map((item) => parseInt(item.amount_saved));
 let totalBalance = total
   .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0)
   .toLocaleString("en-US");

 // ----------- SUM OF FIXED GOALS ----------------
 let fixedGoals = goalData
   .filter((item) => item.type_of_savings === "Fixed")
   .map((item) => parseInt(item.amount_saved));
 let sumOfFixedGoals = fixedGoals
   .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0)
   .toLocaleString("en-US");

 // ----------- SUM OF FLEXIBLE GOALS ----------------
 let flexibleGoals = goalData
   .filter((item) => item.type_of_savings === "Flexible")
   .map((item) => parseInt(item.amount_saved));
 let sumOfFlexibleGoals = flexibleGoals
   .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0)
   .toLocaleString("en-US");

 const current = new Date();

 let month;
 switch (current.getMonth() + 1) {
   case 1:
     month = "January";
     break;
   case 2:
     month = "Febuary";
     break;
   case 3:
     month = "March";
     break;
   case 4:
     month = "April";
     break;
   case 5:
     month = "May";
     break;
   case 6:
     month = "June";
     break;
   case 7:
     month = "July";
   case 8:
     month = "August";
   case 9:
     month = "September";
   case 10:
     month = "October";
   case 11:
     month = "November";
   case 12:
     month = "December";
 }

 const date = `${month} ${current.getDate()} ${current.getFullYear()}`;

 const time = `${current.getHours()}:${current.getMinutes()} ${
   current.getHours < 13 ? "AM" : "PM"
 }`;
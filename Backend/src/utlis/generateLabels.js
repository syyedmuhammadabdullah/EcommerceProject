const generateLabels = (range, startDate) => {
  const labels = [];
  const current = new Date(startDate);

  // const pad = (n) => String(n).padStart(2, "0");
  const pad = (n) => (n < 10 ? '0' + n : n);

  if (range === "daily") {
    // 24 hours
    for (let i = 0; i < 24; i++) {
      labels.push(
        `${pad(current.getHours())}`
      );
      current.setHours(current.getHours() + 1);
    }
  }

  else if (range === "weekly") {
    // 7 days
    for (let i = 0; i < 7; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}-${pad(current.getDate())}`
      );
      current.setDate(current.getDate() + 1);
    }
  }

  else if (range === "monthly") {
    // 30 days
    for (let i = 0; i < 31; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}-${pad(current.getDate())}`
      );
      current.setDate(current.getDate() + 1);
    }
  }

  else if (range === "6 months") {
    // 6 months
    for (let i = 0; i < 6; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}`
      );
      current.setMonth(current.getMonth() + 1);
    }
  }

  return labels;
};

export  {generateLabels};
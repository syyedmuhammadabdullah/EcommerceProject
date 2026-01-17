import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const MyChart = ({ orderstats }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !orderstats?.labels?.length) return;

    // Agar chart pehle se hai → sirf update karo
    if (chartInstanceRef.current) {
      const chart = chartInstanceRef.current;
      chart.data.labels = orderstats.labels;
      chart.data.datasets[0].data = orderstats.delivered;
      chart.data.datasets[1].data = orderstats.cancelled;
      chart.data.datasets[2].data = orderstats.refunded;
      chart.update();
    } 
    // Nahi hai → create new chart
    else {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: orderstats.labels,
          datasets: [
            { label: "Delivered", data: orderstats.delivered, borderColor: "green", backgroundColor: "rgba(0,128,0,0.2)", tension: 0.4 },
            { label: "Cancelled", data: orderstats.cancelled, borderColor: "orange", backgroundColor: "rgba(255,165,0,0.2)", tension: 0.4 },
            { label: "Refunded", data: orderstats.refunded, borderColor: "red", backgroundColor: "rgba(255,0,0,0.2)", tension: 0.4 },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: { y: { beginAtZero: true } },
           aspectRatio: 2
        },
      });
    }

    // cleanup jab component unmount ho
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [orderstats]);

  return <canvas className="max-w-[99%]  max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]" ref={chartRef}></canvas>;
};

export default MyChart;

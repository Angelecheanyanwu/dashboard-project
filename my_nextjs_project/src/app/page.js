"use client";

import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from "chart.js";
import { CandlestickController } from "chartjs-chart-financial";
import "chartjs-chart-financial";
import Image from 'next/image'; 


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CandlestickController
);

const fetchData = async (endpoint) => {
  const response = await fetch(`http://127.0.0.1:8000/${endpoint}`);
  return await response.json();
};

export default function Home() {
  const [data, setData] = useState({
    candlestick: { datasets: [] },
    line: { labels: [], datasets: [] },
    bar: { labels: [], datasets: [] },
    pie: { labels: [], datasets: [] },
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const candlestick = await fetchData("api/candlestick-data/");
        const line = await fetchData("api/line-chart-data/");
        const bar = await fetchData("api/bar-chart-data/");
        const pie = await fetchData("api/pie-chart-data/");
        setData({ candlestick, line, bar, pie });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  const candlestickData = {
    datasets: [
      {
        label: "Candlestick Data",
        data: [
          { x: "2024-09-01", o: 100, h: 120, l: 90, c: 110 },
          { x: "2024-09-02", o: 110, h: 130, l: 100, c: 120 },
         
        ],
      },
    ],
  };

  const lineChartData = {
    labels: data.line.labels.length ? data.line.labels : ["Jan", "Feb", "Mar", "Apr"],
    datasets: data.line.datasets.length ? data.line.datasets : [
      {
        label: 'Line Chart Data',
        data: [10, 20, 30, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: data.bar.labels.length ? data.bar.labels : ["Product A", "Product B", "Product C"],
    datasets: data.bar.datasets.length ? data.bar.datasets : [
      {
        label: 'Bar Chart Data',
        data: [100, 150, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: data.pie.labels.length ? data.pie.labels : ["Red", "Blue", "Yellow"],
    datasets: data.pie.datasets.length ? data.pie.datasets : [
      {
        label: 'Pie Chart Data',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col items-center mb-8">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold mt-4">Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Candlestick Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Candlestick Chart</h2>
          <div style={{ position: "relative", height: "400px", width: "100%" }}>
            <Line data={candlestickData} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Line Chart</h2>
          <Line data={data.line} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Bar Chart</h2>
          <Bar data={data.bar} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Pie Chart</h2>
          <Pie data={data.pie} />
        </div>
      </main>
      <footer className="mt-8 flex gap-6 flex-wrap items-center justify-center">
        {/* Links and footer content */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        {/* More links as needed */}
      </footer>
    </div>
  );
}

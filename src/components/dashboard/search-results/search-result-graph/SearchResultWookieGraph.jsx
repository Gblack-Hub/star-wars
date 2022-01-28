import {useState} from 'react';
import styles from "./search-result-graph.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: false,
      text: 'Bar Chart',
    }
  },
};

export default function SearchResultWookieGraph({result, searchType}) {
    let labels = searchType === "planets" ? ["Akooakhuanraaoahoowh"] : ['Acwoahrracao', 'Scracc'];
    const [data] = useState({
        labels,
        datasets: [
          {
            label: searchType === "planets" ? "Akooakhuanraaoahoowh" : 'Acwoahrracao & Scracc',
            data: searchType === "planets" ? [Number(result?.akooakhuanraaoahoowh)] : [Number(result?.acwoahrracao), Number(result?.scracc)],
            color: "#FFFFFF",
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
          }
        ],
    })
    return (
        <div className={styles.card} title="search-result-wookie-graph">
            <div className={styles.card_lead_text}>{result?.whrascwo}</div>
            <Bar options={options} data={data} />
        </div>
    )
}

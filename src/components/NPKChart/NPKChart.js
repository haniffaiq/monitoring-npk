import { React, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from "recharts";
import { scaleLinear } from "d3-scale";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../../Firebase";
import moment from "moment";
import "./style.css";
import Dropdown from "../../components/Dropdown/Dropdown";

function NPKChart(props) {
  const [data, setData] = useState([]);
  const chartData = [
    ["Nitrogen", "#38ACFF"],
    ["Pospor", "#45DC6F"],
    ["Kalium", "#FFA9A9"],
    ["pH", "#AF9BFF"],
    ["Kelembapan", "#FF835C"],
  ];
  useEffect(() => {
    // Referensi database
    const database = getDatabase();
    const databaseRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");

    // Membaca data dari referensi
    onValue(databaseRef, (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        // Mendapatkan nilai dari setiap field
        const { Date, Time, N, P, K, pH, Humidity } = childData;

        // Membuat objek dengan nilai yang ditemukan
        const obj = {
          id: childKey,
          Date,
          Time,
          N,
          P,
          K,
          pH,
          Humidity,
        };

        dataArray.push(obj);
      });

      // Mengupdate state dengan data yang ditemukan
      setData(dataArray);
      console.log("datanya nih:", data);
    });
  }, []);
  const handleButtonClick = (lineName) => {
    setActiveLine(lineName);
  };

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  const [graphChoose, SetGraphChoose] = useState("Nitrogen");
  // const [DashLine, SetDashLine] = useState(['Pospor', 'Kalium', 'pH', 'Kelembapan'])
  const [colortLine, SetColorLine] = useState("#38ACFF");
  const [activeLine, setActiveLine] = useState("line1");
  const latestData = data.slice(-48);

  const CustomizedXAxisTick = (props) => {
    const { x, y, payload, angle, fontSize, textAnchor, dy, dx } = props;
    const date = moment(payload.value).format("DD MMM YYYY");
    const time = moment(payload.value).format("HH:mm");
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={dx} y={dy} dy={16} textAnchor={textAnchor} fontSize={fontSize} transform={`rotate(${angle})`} fill="#666">
          <tspan x="0">{time}</tspan>
          <tspan x="0" dy="1.2em">
            {date}
          </tspan>
        </text>
      </g>
    );
  };

  // Code untuk table
  const [chartColors, setChartColors] = useState({});

  useEffect(() => {
    const colors = {};
    chartData.forEach(([sensor, color]) => {
      colors[sensor] = color;
    });
    setChartColors(colors);
  }, []);
  const Table = () => {
    const lastData = data.slice(-12);
    return (
      <div className="table-style-custom">
        <table className="table-auto w-full table-fixed text-white">
          <thead>
            <tr>
              <th className="w-2/3 p-2 text-grafik"></th>
              {lastData.map((d) => (
                <th key={d.time} className="w-1/3 border-column p-2 text-grafik">
                  {d.time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(lastData[0])
              .filter((key) => key !== "id" && key !== "date" && key !== "time")
              .map((key) => (
                <tr key={key}>
                  <td className="w-2/3 border-column2 p-2 text-grafik " style={{ color: chartColors[key] }}>
                    {key}{" "}
                  </td>
                  {lastData.map((d) => (
                    <td key={`${key}-${d.time}`} className="w-1/3 border-row p-2 text-sm text-grafik text-center	" style={{ color: chartColors[key] }}>
                      {d[key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-2 gap-2">
      {/* Bagian Chart */}
      <div className="grid grid-rows-6 gap-4 bg-gray-900 rounded-xl p-5 card-container">
        <div className="grid grid-cols-5 gap-4">
          <div className="grid grid-cols-5">
            <div class="w-8 h-8 rounded-full mt-5 bg-red-600"></div>
            <div class="w-8 h-8 rounded-full mt-5 bg-green-500"></div>
          </div>
          <div>{/* TO DO */}</div>

          <div className="grid grid-cols-5 gap-2 col-span-3">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center max-h-8 "
              onClick={() => {
                SetGraphChoose("Nitrogen");
                SetColorLine("#38ACFF");
              }}
            >
              <span class="w-2 h-2 rounded-full mr-2 bg-Nitrogen"></span>
              <p className="text-name">Nitrogen</p>
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center  max-h-8"
              onClick={() => {
                SetGraphChoose("Pospor");
                SetColorLine("#45DC6F");
              }}
            >
              <span class="w-2 h-2 rounded-full mr-2 bg-Pospor"></span>
              <p className="text-name">Pospor</p>
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center  max-h-8"
              onClick={() => {
                SetGraphChoose("Kalium");
                SetColorLine("#FFA9A9");
              }}
            >
              <span class="w-2 h-2 rounded-full mr-2 bg-Kalium"></span>
              <p className="text-name">Kalium</p>
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center max-h-8"
              onClick={() => {
                SetGraphChoose("pH");
                SetColorLine("#AF9BFF");
              }}
            >
              <span class="w-2 h-2 rounded-full mr-2 bg-pH"></span>
              <p className="text-name">pH</p>
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center justify-center max-h-8 "
              onClick={() => {
                SetGraphChoose("Kelembapan");
                SetColorLine("#FF835C");
              }}
            >
              <span class="w-2 h-2 rounded-full mr-2 bg-Kelembapan"></span>
              <p className="text-name">Kelembapan</p>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <p className="text-grafik">Grafik Hasil Pengamatan</p>
          </div>
          <div>{/* TO DO */}</div>
          <div>{/* TO DO */}</div>
          <div className="grid grid-cols-2 gap-2 col-span-2">
            <div>{/* SPACE*/}</div>
            <Dropdown />
          </div>
        </div>
        <div class="row-span-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={200}
              height={100}
              data={latestData}
              syncId="id"
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 25,
              }}
            >
              <XAxis dataKey={(d) => `${d.date} ${d.time}`} interval={2} tick={<CustomizedXAxisTick angle={0} fontSize={10} textAnchor="end" dy={0} dx={0} />} />
              <YAxis />
              <Tooltip />

              {/* {chartData.map((item) => (
                        <Line type="monotone" dataKey={item[0]} stroke={item[1]} activeDot={{ r: 8 }} />
                    ))} */}
              <Line type="monotone" dataKey={graphChoose} stroke={colortLine} activeDot={{ r: 8 }} strokeWidth={3} />
              {/* <Line type="monotone" dataKey="uv" stroke="#45DC6F" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="amt" stroke="#FFA9A9" activeDot={{ r: 8 }} /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Bagian Tabel dan Prediksi */}
      <div className="grid grid-cols-3 gap-4 rounded-xl p-5">
        <div className="card-container rounded-xl p-5 inline-flex items-center justify-center text-grafik">
          <p className="text-white">Prediksi Here</p>
        </div>
        <div className="card-container rounded-xl p-10 col-span-2 inline-flex  items-center justify-center ">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default NPKChart;

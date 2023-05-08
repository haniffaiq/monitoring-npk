import { React, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import { scaleLinear } from "d3-scale";
import moment from 'moment';
import './style.css';
import Dropdown from "../../components/Dropdown/Dropdown";

function NPKChart(props) {
    const chartData = [['Nitrogen', "#38ACFF"], ['Pospor', "#45DC6F"], ['Kalium', "#FFA9A9"], ['pH', "#AF9BFF"], ['Kelembapan', "#FF835C"]]
    const data = [
        { "id": 1, "date": "2023-05-06", "time": "17:26", "Nitrogen": 194, "Pospor": 1127, "Kalium": 1502, "pH": 114, "Kelembapan": 1145 },
        { "id": 2, "date": "2023-05-06", "time": "22:15", "Nitrogen": 1901, "Pospor": 1653, "Kalium": 422, "pH": 1962, "Kelembapan": 647 },
        { "id": 3, "date": "2023-05-06", "time": "17:25", "Nitrogen": 1607, "Pospor": 1439, "Kalium": 1900, "pH": 749, "Kelembapan": 1037 },
        { "id": 4, "date": "2023-05-06", "time": "2:55", "Nitrogen": 641, "Pospor": 1448, "Kalium": 1175, "pH": 554, "Kelembapan": 1692 },
        { "id": 5, "date": "2023-05-06", "time": "7:51", "Nitrogen": 801, "Pospor": 428, "Kalium": 280, "pH": 232, "Kelembapan": 362 },
        { "id": 6, "date": "2023-05-06", "time": "16:23", "Nitrogen": 1909, "Pospor": 1168, "Kalium": 816, "pH": 1911, "Kelembapan": 1562 },
        { "id": 7, "date": "2023-05-06", "time": "9:15", "Nitrogen": 1182, "Pospor": 1009, "Kalium": 1521, "pH": 1367, "Kelembapan": 958 },
        { "id": 8, "date": "2023-05-06", "time": "9:08", "Nitrogen": 565, "Pospor": 1767, "Kalium": 437, "pH": 769, "Kelembapan": 636 },
        { "id": 9, "date": "2023-05-06", "time": "12:28", "Nitrogen": 1469, "Pospor": 631, "Kalium": 1021, "pH": 1859, "Kelembapan": 1277 },
        { "id": 10, "date": "2023-05-06", "time": "0:39", "Nitrogen": 1687, "Pospor": 536, "Kalium": 415, "pH": 1827, "Kelembapan": 958 },
        { "id": 11, "date": "2023-05-06", "time": "9:20", "Nitrogen": 505, "Pospor": 1119, "Kalium": 23, "pH": 505, "Kelembapan": 1043 },
        { "id": 12, "date": "2023-05-06", "time": "21:31", "Nitrogen": 412, "Pospor": 1651, "Kalium": 1877, "pH": 277, "Kelembapan": 1276 },
        { "id": 13, "date": "2023-05-06", "time": "15:06", "Nitrogen": 309, "Pospor": 1259, "Kalium": 1014, "pH": 1683, "Kelembapan": 142 },
        { "id": 14, "date": "2023-05-06", "time": "15:56", "Nitrogen": 518, "Pospor": 537, "Kalium": 1261, "pH": 229, "Kelembapan": 1607 },
        { "id": 15, "date": "2023-05-06", "time": "4:23", "Nitrogen": 525, "Pospor": 413, "Kalium": 1980, "pH": 1314, "Kelembapan": 1686 },
        { "id": 16, "date": "2023-05-06", "time": "20:08", "Nitrogen": 70, "Pospor": 1263, "Kalium": 1046, "pH": 168, "Kelembapan": 1747 },
        { "id": 17, "date": "2023-05-06", "time": "23:35", "Nitrogen": 197, "Pospor": 1663, "Kalium": 567, "pH": 1172, "Kelembapan": 240 },
        { "id": 18, "date": "2023-05-06", "time": "17:51", "Nitrogen": 745, "Pospor": 1060, "Kalium": 1, "pH": 882, "Kelembapan": 120 },
        { "id": 19, "date": "2023-05-06", "time": "7:01", "Nitrogen": 1193, "Pospor": 188, "Kalium": 1565, "pH": 1707, "Kelembapan": 163 },
        { "id": 20, "date": "2023-05-06", "time": "21:22", "Nitrogen": 1714, "Pospor": 463, "Kalium": 1161, "pH": 1528, "Kelembapan": 1394 },
        { "id": 21, "date": "2023-05-06", "time": "3:15", "Nitrogen": 928, "Pospor": 1914, "Kalium": 1958, "pH": 759, "Kelembapan": 902 },
        { "id": 22, "date": "2023-05-06", "time": "9:35", "Nitrogen": 1312, "Pospor": 1653, "Kalium": 1610, "pH": 448, "Kelembapan": 206 },
        { "id": 23, "date": "2023-05-06", "time": "22:10", "Nitrogen": 14, "Pospor": 15, "Kalium": 127, "pH": 204, "Kelembapan": 820 },
        { "id": 24, "date": "2023-05-06", "time": "12:54", "Nitrogen": 1316, "Pospor": 227, "Kalium": 336, "pH": 296, "Kelembapan": 1434 },
        { "id": 25, "date": "2023-05-06", "time": "5:23", "Nitrogen": 1347, "Pospor": 176, "Kalium": 156, "pH": 1734, "Kelembapan": 282 },
        { "id": 26, "date": "2023-05-06", "time": "22:49", "Nitrogen": 640, "Pospor": 158, "Kalium": 851, "pH": 504, "Kelembapan": 837 },
        { "id": 27, "date": "2023-05-06", "time": "13:33", "Nitrogen": 1821, "Pospor": 1693, "Kalium": 1312, "pH": 1070, "Kelembapan": 1795 },
        { "id": 28, "date": "2023-05-06", "time": "12:26", "Nitrogen": 1554, "Pospor": 1123, "Kalium": 1975, "pH": 1901, "Kelembapan": 1207 },
        { "id": 29, "date": "2023-05-06", "time": "15:56", "Nitrogen": 453, "Pospor": 177, "Kalium": 1112, "pH": 205, "Kelembapan": 1819 },
        { "id": 30, "date": "2023-05-06", "time": "20:14", "Nitrogen": 1063, "Pospor": 1928, "Kalium": 1037, "pH": 1388, "Kelembapan": 1968 },
        { "id": 31, "date": "2023-05-06", "time": "4:05", "Nitrogen": 1915, "Pospor": 1230, "Kalium": 205, "pH": 12, "Kelembapan": 1442 },
        { "id": 32, "date": "2023-05-06", "time": "6:14", "Nitrogen": 379, "Pospor": 1861, "Kalium": 1040, "pH": 1817, "Kelembapan": 1369 },
        { "id": 33, "date": "2023-05-06", "time": "17:52", "Nitrogen": 411, "Pospor": 1143, "Kalium": 1832, "pH": 1576, "Kelembapan": 1151 },
        { "id": 34, "date": "2023-05-06", "time": "12:25", "Nitrogen": 536, "Pospor": 1319, "Kalium": 1574, "pH": 629, "Kelembapan": 1712 },
        { "id": 35, "date": "2023-05-06", "time": "12:53", "Nitrogen": 407, "Pospor": 291, "Kalium": 360, "pH": 599, "Kelembapan": 930 },
        { "id": 36, "date": "2023-05-06", "time": "3:41", "Nitrogen": 1980, "Pospor": 635, "Kalium": 1458, "pH": 1626, "Kelembapan": 487 },
        { "id": 37, "date": "2023-05-06", "time": "18:03", "Nitrogen": 252, "Pospor": 171, "Kalium": 1691, "pH": 192, "Kelembapan": 467 },
        { "id": 38, "date": "2023-05-06", "time": "4:44", "Nitrogen": 819, "Pospor": 87, "Kalium": 434, "pH": 1403, "Kelembapan": 925 },
        { "id": 39, "date": "2023-05-06", "time": "7:09", "Nitrogen": 1004, "Pospor": 710, "Kalium": 1177, "pH": 1328, "Kelembapan": 188 },
        { "id": 40, "date": "2023-05-06", "time": "11:46", "Nitrogen": 1811, "Pospor": 1769, "Kalium": 204, "pH": 947, "Kelembapan": 1083 },
        { "id": 41, "date": "2023-05-06", "time": "4:56", "Nitrogen": 1043, "Pospor": 469, "Kalium": 1239, "pH": 1098, "Kelembapan": 162 },
        { "id": 42, "date": "2023-05-06", "time": "7:57", "Nitrogen": 1263, "Pospor": 1881, "Kalium": 1618, "pH": 380, "Kelembapan": 1943 },
        { "id": 43, "date": "2023-05-06", "time": "2:16", "Nitrogen": 1385, "Pospor": 473, "Kalium": 1646, "pH": 1655, "Kelembapan": 1773 },
        { "id": 44, "date": "2023-05-06", "time": "8:15", "Nitrogen": 1127, "Pospor": 39, "Kalium": 1826, "pH": 1289, "Kelembapan": 1643 },
        { "id": 45, "date": "2023-05-06", "time": "4:24", "Nitrogen": 908, "Pospor": 895, "Kalium": 786, "pH": 1609, "Kelembapan": 1492 },
        { "id": 46, "date": "2023-05-06", "time": "15:42", "Nitrogen": 837, "Pospor": 637, "Kalium": 1043, "pH": 1216, "Kelembapan": 228 },
        { "id": 47, "date": "2023-05-06", "time": "15:28", "Nitrogen": 125, "Pospor": 1652, "Kalium": 412, "pH": 353, "Kelembapan": 363 },
        { "id": 48, "date": "2023-05-06", "time": "2:54", "Nitrogen": 1492, "Pospor": 1805, "Kalium": 1378, "pH": 939, "Kelembapan": 932 }]
    const handleButtonClick = (lineName) => {
        setActiveLine(lineName);
    };

    const sortedData = data.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
    });


    const [graphChoose, SetGraphChoose] = useState('Nitrogen')
    // const [DashLine, SetDashLine] = useState(['Pospor', 'Kalium', 'pH', 'Kelembapan'])
    const [colortLine, SetColorLine] = useState("#38ACFF")
    const [activeLine, setActiveLine] = useState('line1');
    const latestData = data.slice(-48);


    const CustomizedXAxisTick = (props) => {
        const { x, y, payload, angle, fontSize, textAnchor, dy, dx } = props;
        const date = moment(payload.value).format('DD MMM YYYY');
        const time = moment(payload.value).format('HH:mm');
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={dx}
                    y={dy}
                    dy={16}
                    textAnchor={textAnchor}
                    fontSize={fontSize}
                    transform={`rotate(${angle})`}
                    fill="#666"
                >
                    <tspan x="0">{time}</tspan>
                    <tspan x="0" dy="1.2em">
                        {date}
                    </tspan>
                </text>
            </g>
        );
    };


    return (
        <div className="grid grid-rows-7 gap-4 bg-gray-900 rounded-xl p-5 card-container">
            <div className="grid grid-cols-5 gap-4">
                <div className="grid grid-cols-5">
                    <div class="w-8 h-8 rounded-full mt-5 bg-red-600"></div>
                    <div class="w-8 h-8 rounded-full mt-5 bg-green-500"></div>
                </div>
                <div>
                    {/* TO DO */}
                </div>
                <div>
                    {/* TO DO */}
                </div>
                <div className="grid grid-cols-5 gap-2 col-span-2">
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center  max-h-8"
                        onClick={() => {
                            SetGraphChoose('Nitrogen')
                            SetColorLine("#38ACFF")
                        }}
                    >

                        <span class="w-2 h-2 rounded-full mr-2 bg-Nitrogen"></span>
                        <p className='text-xs'>Nitrogen</p>
                    </button>
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center  max-h-8"
                        onClick={() => {
                            SetGraphChoose('Pospor')
                            SetColorLine("#45DC6F")
                        }}
                    >
                        <span class="w-2 h-2 rounded-full mr-2 bg-Pospor"></span>
                        <p className='text-xs'>Pospor</p>
                    </button>
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center  max-h-8"
                        onClick={() => {
                            SetGraphChoose('Kalium')
                            SetColorLine("#FFA9A9")
                        }}
                    >
                        <span class="w-2 h-2 rounded-full mr-2 bg-Kalium"></span>
                        <p className='text-xs'>Kalium</p>
                    </button>
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center max-h-8"
                        onClick={() => {
                            SetGraphChoose('pH')
                            SetColorLine("#AF9BFF")
                        }}
                    >
                        <span class="w-2 h-2 rounded-full mr-2 bg-pH"></span>
                        <p className='text-xs'>pH</p>
                    </button>
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-full inline-flex items-center justify-center max-h-8 "
                        onClick={() => {
                            SetGraphChoose('Kelembapan')
                            SetColorLine("#FF835C")
                        }}
                    >
                        <span class="w-2 h-2 rounded-full mr-2 bg-Kelembapan"></span>
                        <p className='text-xs'>Kelembapan</p>
                    </button>
                </div>

            </div>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    {/* TO DO */}
                </div>
                <div>
                    {/* TO DO */}
                </div>
                <div>
                    {/* TO DO */}
                </div>
                <div className="grid grid-cols-2 gap-2 col-span-2">
                    <div>
                        {/* SPACE*/}
                    </div>
                    <Dropdown />
                </div>
            </div>
            <div class="row-span-5">
                <ResponsiveContainer width="100%" height="80%">
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
                        <XAxis dataKey={(d) => `${d.date} ${d.time}`} interval={2} tick={
                            <CustomizedXAxisTick
                                angle={0}
                                fontSize={10}
                                textAnchor="end"
                                dy={0}
                                dx={0}
                            />
                        } />
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

    );
}

export default NPKChart;
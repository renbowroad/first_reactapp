import logo from './logo.svg';
import React, { useState, useRef, useEffect }  from 'react';
import axios from 'axios';
import './App.css';
import { PopulationTable } from './PopulationTable';
import { PrefectureSelect } from './PrefectureSelect';
import styles from './style.module.css';
// import PopulationTable from './PopulationTable';
// import PrefectureSelect from './PrefectureSelect';


function App() {

  type Pref = {
    prefCode: number;
    prefName: string;
  }

  type Pop = {
    year: number;
    value: number;
  }

  const [prefs, setPrefs] = useState<Pref[]>([])
  const [populations, setPopulations] = useState<Pop[]>([])

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    axios
    .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${value}`,{headers:{'**': '**'}})
    .then((response) => setPopulations(response.data.result.data[0].data));//populationsの中に格納
  }
    
  useEffect(() => {
    axios
    .get('https://opendata.resas-portal.go.jp/api/v1/prefectures',{headers:{'**': '**'}})
    .then((response) => setPrefs(response.data.result));
  }, []);
  
  return (
    <div className="App">
       <h1>都道府県別人口データ</h1>
       <select onChange={selectChange}>
        <option hidden>選択してください</option>
        {prefs.map((option) => {
          console.log(option.prefCode)
          return (
          <PrefectureSelect pref={option} />
          );
          })}
       </select>
       <h2>人口推移表</h2>
       <table className={styles.popTable}>
        {populations.length != 0 &&
        <>
        <thead>
          <tr>
            <th className={styles.ad}>西暦</th>
            <th className={styles.pop}>総人口</th>
            </tr>
        </thead>
        </>
        }
        {populations.map((population) => {
          return(
          <PopulationTable pop={population} />
          );
          })}
        </table>
    </div>
  );
}

export default App;

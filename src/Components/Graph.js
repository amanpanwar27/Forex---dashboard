import React, { useEffect, useState } from 'react';
import "./Graph.css"
import Plot from 'react-plotly.js';
import { Card } from 'antd';
import {Select,Spin,Switch} from "antd";
const {Option} = Select;


const Graph = ({from,to,items,setOpen})=>{
    const [xcord,setxcord] = useState([]);
    const [ycord,setycord] = useState([]);
    const [open,setopen] = useState([]);
    const [close , setclose] = useState([]);
    const [low,setlow] = useState([]);
    const [filterval,setfilterval] = useState("Daily");
    const [isloading,setisloading] = useState(false);
    const [stats,setstats] = useState();
    const getavg = ()=>{
        console.log(parseFloat(close[0]))
        let lowsum = 0;
        low.forEach((curr)=>{
            lowsum += parseFloat(curr);
        })
        let opensum = 0;
        open.forEach((curr)=>{
            opensum += parseFloat(curr);
        })
        let closesum = 0;
        close.forEach((curr)=>{
            closesum += parseFloat(curr);
        });
        console.log(lowsum,closesum,opensum);
        setstats({
            "closeavg" : (closesum/close.length),
            "openavg" : (opensum/open.length),
            "lowavg" : (lowsum/low.length)
        });

    }
    const fetchdata = async(type)=>{
        setisloading(true);
        let key;
        if(type == "FX_DAILY")key = "Time Series FX (Daily)"
        else if(type == "FX_WEEKLY")key = "Time Series FX (Weekly)";
        else key = "Time Series FX (Monthly)"
        console.log(to.slice(0,3));
        await fetch(`https://www.alphavantage.co/query?function=${type}&from_symbol=${from.slice(0,3)}&to_symbol=${to.slice(0,3)}&apikey=GCVCQFMHXPA60QVW`).
        then((res)=>res.json()).then((res)=>{
            console.log(res);
            if(res[key]){
                setxcord(Object.keys(res[key]));
            const temp = Object.values(res[key]);
            let temp2 = [];
            let opentemp = [];
            let closetemp = [];
            let lowtemp = [];
            temp.forEach((curr)=>{
                temp2.push(curr["2. high"]);
                opentemp.push(curr["1. open"]);
                lowtemp.push(curr["3. low"]);
                closetemp.push(curr["4. close"]);
            })
            setycord(temp2);
            setopen(opentemp);
            setclose(closetemp);
            setlow(closetemp);
            getavg();
            setisloading(false);
            }
            else if(res['Error Message'] || res['Note']){setOpen(true)}
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchdata("FX_DAILY");
    },[from,to])
    console.log(stats);
    return (
        <>
        {isloading ? <Spin style={{
            position:"relative",
            top:"18%",
            left:"45%",
        }}
        size='large'
        /> : <>
        
            <Card bordered={true} style={{
            backgroundColor:"#f8f6f5"
        }}>

        <div className='graph-container'>
        <Plot
        data={[
          {
            x: xcord,
            y: ycord,
            type: 'lines', 
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
          {type: 'line', x: xcord, y: ycord},
        ]}
        layout={{width: "100%", height: "100%" }}
      />
     <div>
     <Select placeholder={filterval}  style={{
        marginLeft:"25px",
      }}
      onChange={(e)=>{
        setfilterval(e.slice(3));
        fetchdata(e);
      }}
      >
        <Option value = "FX_DAILY">Daily</Option>
        <Option value = "FX_WEEKLY">Weekly</Option>
        <Option value = "FX_MONTHLY">Monthly</Option>
      </Select>
     </div>
        </div>

        
     <div className='list-container'>
     {
        stats && <>
        <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={isloading}
      >
        <h3 style={{
            color:"grey"
        }}>Average Open</h3>
        <h2>{stats.openavg.toFixed(4)}</h2>
      </Card>  

      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={isloading}
      >
        <h3 style={{
            color:"grey"
        }}>Average Close</h3>
        <h2>{stats.closeavg.toFixed(4)}</h2>
      </Card>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={isloading}
      >
        <h3 style={{
            color:"grey"
        }}>Average Low</h3>
        <h2>{stats.lowavg.toFixed(4)}</h2>
      </Card>
        </>
     }

     </div>
        </Card>
        </>}

        </>
      
    );
  
}

export default Graph;
import { Card,Select,Divider } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import { useEffect, useState } from "react";
import "./Rightbar.css"
const {Option} = Select;
const Rightbar = ({
    to,from,setto,setfrom,items
})=>{
    const [stats,setstats] = useState();
    const getcurrentprice = async(curr_from,curr_to)=>{
        await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${curr_from}&to_currency=${curr_to}&apikey=GCVCQFMHXPA60QVW`).
        then((res)=>res.json()).then((res)=>{
            console.log(res);
            setstats(res["Realtime Currency Exchange Rate"]);
        }).catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getcurrentprice("USD","GBP");
    },[])
    return <div>
        <Card bordered={true} style={{
            backgroundColor:"#f8f6f5"
        }}>
        <div>
        <label style={{
            marginLeft:"5px"
            }}>From</label>
        <br/>
        <Select
        onChange={(e)=>{
            setfrom(e);
        }}
    placeholder={from}
    size="large"
    dropdownStyle={{ minWidth: "20%",}}
    style={{ minWidth: "50%", height: "32px",width:"250px"}}>
        {items.map((curr,count)=>{
            return <Option value = {curr.label}
            >{curr.label}</Option>
        })}
        </Select>
        </div>
        <div style={{
                marginTop:"20px",
            }}>
        <label style={{
            marginLeft:"5px"    
            }}>To</label>
        <br/>
        <Select
        onChange={(e)=>{
            setto(e);
        }}
    placeholder={to}
    size="large"
    dropdownStyle={{ minWidth: "20%",}}
    style={{ minWidth: "50%", height: "32px",width:"250px"}}>
        {items.map((curr,count)=>{
            return <Option value = {curr.label} >{curr.label}</Option>
        })}
        </Select>
        </div>
        <div style={{
            marginTop:"35px",
        }}> 
        </div>

        {stats && <div style={{
            marginTop:"40px"
        }}>
        <h3 style={{
            position:"relative",
            top:"20px",
            color:"grey"
        }}>{`1 ${from} equals`} </h3>
        <h1>{stats["5. Exchange Rate"]}</h1>
        <h1 style={{
            position:"relative",
            bottom:"20px"
        }}>{to}</h1>
        </div>}
        <hr/>

       {stats && <>
       
        <div>
       <h3 style={{
            color:"grey"
        }}>Bid Price:</h3>
        <h2>{stats["8. Bid Price"].slice(0,6)}</h2>
       </div>
       <div>
       <h3 style={{
            color:"grey"
        }}>Ask Price:</h3>
        <h2>{stats["9. Ask Price"].slice(0,6)}</h2>
       </div>
       <div>
       <h3 style={{
            color:"grey"
        }}>Last Refreshed:</h3>
        <h2>{stats["6. Last Refreshed"]}</h2>
       </div>
       
       </>}
        </Card>
    </div>
}   
export default Rightbar;
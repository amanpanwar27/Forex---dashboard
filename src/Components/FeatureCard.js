
import { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
const Feature = (
    {from ,to,setfrom,setto}
)=>{
    const [data,setdata] = useState(null);
    const getdata = async()=>{
        await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=GCVCQFMHXPA60QVW`).
        then((res)=>res.json()).then((res)=>{
            setdata(res["Realtime Currency Exchange Rate"]);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getdata();
    },[])
    console.log(data);
    return <div onClick={()=>{
        setto(to);
        setfrom(from);
    }}>
    <h2 style={{
        position:"relative",
        bottom:"25px"
    }}>{from} <ArrowRightOutlined /> {to}</h2>
    {data && <h3 style={{
        color:"grey",
        position:"relative",
        bottom:"30px"
    }}>{data["5. Exchange Rate"].slice(0,6)}</h3>}
    </div>
}
export default Feature;
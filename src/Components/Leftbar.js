import { useEffect, useState } from "react";
import "./Leftbar.css";
import Feature from "./FeatureCard";
import { Card, Col, Row } from 'antd';
const {Meta} = Card;
const POPULAR = ['EUR','INR','USD','AED','HKD'];
const Leftbar = ({setto ,setfrom})=>{

    return <div className="container">
        
        <Card bordered={true} style={{
            backgroundColor:"#f8f6f5",
            width:"100%"
        }}>
            <h3>Trending ForEx</h3>
            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:"10px"
            }}>

                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "USD" to = "INR" setto = {setto} setfrom = {setfrom}/>
                </Card>
                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "AED" to = "INR" setto = {setto} setfrom = {setfrom}/>
                </Card>
                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "EUR" to = "INR" setto = {setto} setfrom = {setfrom}/>
                </Card>
                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "USD" to = "EUR" setto = {setto} setfrom = {setfrom}/>
                </Card>
                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "USD" to = "AED" setto = {setto} setfrom = {setfrom}/>
                </Card>
                <Card
                    hoverable
                    style={{
                    width: "100%",
                    height:"100px"
                    }}
                >
                    <Feature from = "INR" to = "GBP" setto = {setto} setfrom = {setfrom}/>
                </Card>

            </div>
    </Card>
    </div>
}
export default Leftbar;
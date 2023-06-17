import Graph from "./Components/Graph";
import Leftbar from "./Components/Leftbar";
import Navbar from "./Components/Navbar";
import Rightbar from "./Components/Rightbar";
import { useState } from "react";
import {currency} from "./currency";
import { Modal } from "antd";
import "./App.css";
let items = [];
currency.forEach((curr,count)=>{
    items.push({
        "label" : curr.label + ",  " + curr.name,
        "code" : curr.label,
        key:count
    });
})
function App() {
  const [from ,setfrom] = useState("USD ,United States Dollar");
  const [to ,setto] = useState("GBP,British Pound Sterling");
  const [open, setOpen] = useState(false);
  return (<>
  <Navbar/>
  <div className="container">
  <div className="leftcontainer">
  <Leftbar setfrom = {setfrom} setto = {setto}/>
  </div>
  <div className="midcontainer">
  <Graph from = {from} to = {to} items={items} setOpen = {setOpen}/>
  </div>
  <div className="rightcontainer">
  <Rightbar from = {from} to = {to} setfrom={setfrom} setto={setto} items={items}/>
  </div>
  </div>
  <Modal
        title="Error"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p style={{
            color:"red",
            fontSize:"16px"
        }}>
            API integrated to this application have limited calls per minute , please wait for 1 minute or try reloading the page again!!
        </p>
      </Modal>
  </>);
}

export default App;

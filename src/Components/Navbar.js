import './Navbar.css';
const Navbar = ()=>{
    return <>
    <div style={{
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        width:"100%",
        height:"50px"  ,
        position:"fixed",  
        display:"flex",
        // flexDirection:"row",
        zIndex:"100 !important" 
    }}>
    <div style={{
        display:"flex",
        flexDirection:"row",
    }}>
        <div>
            <img  style = {{
            }}src="https://finmo.net/wp-content/webp-express/webp-images/uploads/2022/01/logo.png.webp"  className='icon'/>
        </div>
        {/* <div className='icon-container'>
            <img src="./cogwheel.png" className='icon'/>
            <img src="./active.png" className='icon'/>
            <img src="./girl.png" className='icon'/>
        </div> */}

    </div>
    </div>
    </>
}
export default Navbar;
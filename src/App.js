import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Details from "./components/details/Details";
import Toolbar from "./components/toolbar/Toolbar";
import Insights from "./components/insights/Insights";
import { FastAverageColor } from "fast-average-color";
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';
function App() {

  const nasaApiKey = "hmPw5gwCOhs5ullNcV3ta2w3be9yeeDk8glX1jah"

  const [insightsVisible, setInsightsVisible] = useState(false)
  const [captionsVisible, setCaptionsVisible] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [visibleHideFullScreenButton, setVisibleHideFullScreenButton] = useState(false)

  const [apodDetails, setApodDetails] = useState(null)
  const [loadingApodDetails, setLoadingApodDetails] = useState(true )
  const [selectedDate, setSelectedDate] = useState(null)
  const [dominantColor, setDominantColor] = useState(
    {
      rgba : "#1e293b",
      isDark: true
    }
  )

  useEffect(()=>{
    getApodOfToday(new Date());
    //set today
    setToday()
    
  },[])
  function setToday(){
    const d = new Date()
    setSelectedDate(d)


  }
  function handleInsightsVisible(val){
    setInsightsVisible(val)
  }
  function  handleChangeCaptions(){

    setCaptionsVisible(!captionsVisible)
  }
  function handleFullScreenChange(){
    setFullScreen(!fullScreen)
  }
  function handleDateChange(newDate){
setSelectedDate(newDate)
getApodOfToday(newDate)
  }
  function mouseOverDocument(){
    setVisibleHideFullScreenButton(true)
  }
  function exitFullScreen(){
    setFullScreen(false)
 try{
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

 }
 catch{

 }
  }
  
 
  const functionToRunAfterInactivity = () => {
    setVisibleHideFullScreenButton(false)
};
  document.addEventListener("mousemove", fullScreen ? debounce(functionToRunAfterInactivity, 2000) : null);
  function debounce(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}



async function getApodOfToday(date){
  setLoadingApodDetails(true)
 
  const dateStr = date.toISOString().split('T')[0]
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${dateStr}`)
  const data = await response.json();
  data.color = dominantColor
 
  setApodDetails(data)
   setLoadingApodDetails(false)
 getDominantColor(data.url)
  console.log(data)
}

async function getDominantColor(url){
  const fac = new FastAverageColor();

 
try{
  const color = await fac.getColorAsync("https://corsproxy.io/?" + url)
  console.log({...color})
  console.log(rgbHex(color.rgba))
  const newShade =  hexRgb(LightenDarkenColor(rgbHex(color.rgb),-50))
  color.rgba = `rgba(${newShade.red},${newShade.green},${newShade.blue},${newShade.alpha})`
  color.isDark = true
  //Toggle of top to change text colors depends on the dark & light dom color
  setDominantColor(color)
 
}
catch(e){

}


}
function LightenDarkenColor(col, amt) {
  
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}
  return (
 
    <div onMouseMove={()=>mouseOverDocument()}  className={`${fullScreen ? 'w-screen h-screen' : ''} font-space bg bg-cover relative bg-center`} style={{backgroundImage: "url('" + apodDetails?.url + "')"}}>

 
 
{!fullScreen && <div>      <div className="z-10 absolute top-0 left-0 w-screen  h-screen " style={{background: `linear-gradient(180deg, rgb(30 41 59 / 34%) 0%, rgb(255 255 255 / 0%) 28%, rgb(255 255 255 / 0%) 28%, ${dominantColor?.rgba} 100%)`}}></div>
 <div className="container mx-auto z-10 relative h-full">

<div className={`flex flex-col justify-between min-h-screen py-14 gap-10 ${dominantColor.isDark ? 'text-white' : 'text-slate-800'}`}>
  <div className="flex-1">
    
 <Header imageName={apodDetails?.title} imageURL={apodDetails?.hdurl} handleFullScreenChange={handleFullScreenChange} fullScreen={fullScreen}></Header>

  </div>
  <div>


{apodDetails && <Details dominantColor={dominantColor} apodDetails={apodDetails} captionsVisible={captionsVisible}></Details>
}
  </div>
<Toolbar dominantColor={dominantColor} loadingApodDetails={loadingApodDetails} handleDateChange={handleDateChange} selectedDate={selectedDate} captionsVisible={captionsVisible} handleChangeCaptions={handleChangeCaptions} handleInsightsVisible={handleInsightsVisible}></Toolbar>
</div>

 </div>

{insightsVisible &&  <Insights apodTitle={apodDetails.title} apodDesc={apodDetails.description}  handleInsightsVisible={handleInsightsVisible}></Insights>}</div>}

{visibleHideFullScreenButton && fullScreen && <div className="p-6 w-screen absolute bottom-0 left-0 text-center flex items-center justify-center">
<button onClick={()=>exitFullScreen()}  className="bg-white/50 appereance-none text-slate-800 gap-4 flex items-center justify-center p-3 rounded-lg hover:bg-white/100 transition-colors">
 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

        <label className="cursor-pointer">Exit full screen</label>
         
            </button>
</div>}

    </div>

  );
}

export default App;

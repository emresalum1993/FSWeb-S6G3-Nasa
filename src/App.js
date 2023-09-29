import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Details from "./components/details/Details";
import Toolbar from "./components/toolbar/Toolbar";
import Insights from "./components/insights/Insights";
 
function App() {

  const nasaApiKey = "hmPw5gwCOhs5ullNcV3ta2w3be9yeeDk8glX1jah"

  const [insightsVisible, setInsightsVisible] = useState(false)
  const [captionsVisible, setCaptionsVisible] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [visibleHideFullScreenButton, setVisibleHideFullScreenButton] = useState(false)

  const [apodDetails, setApodDetails] = useState({})
  const [loadingApodDetails, setLoadingApodDetails] = useState(true )
  const [selectedDate, setSelectedDate] = useState(null)


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
  setApodDetails(data)
   setLoadingApodDetails(false)
  console.log(data)
}

  return (
 
    <div onMouseMove={()=>mouseOverDocument()}  className={`${fullScreen ? 'w-screen h-screen' : ''} font-space bg bg-cover relative bg-center`} style={{backgroundImage: "url('" + apodDetails?.url + "')"}}>

 
 
{!fullScreen && <div>      <div className="z-10 absolute top-0 left-0 w-screen  h-screen bg-gradient-to-b from-slate-800/75 form-10% via-transparent via-30% to-slate-800/100 bg-"></div>
 <div className="container mx-auto z-10 relative h-full">

<div className="flex text-white flex-col justify-between min-h-screen py-14 gap-10">
  <div className="flex-1">
    
 <Header handleFullScreenChange={handleFullScreenChange} fullScreen={fullScreen}></Header>

  </div>
  <div>


<Details apodDetails={apodDetails} captionsVisible={captionsVisible}></Details>

  </div>
<Toolbar loadingApodDetails={loadingApodDetails} handleDateChange={handleDateChange} selectedDate={selectedDate} captionsVisible={captionsVisible} handleChangeCaptions={handleChangeCaptions} handleInsightsVisible={handleInsightsVisible}></Toolbar>
</div>

 </div>

{insightsVisible &&  <Insights handleInsightsVisible={handleInsightsVisible}></Insights>}</div>}

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

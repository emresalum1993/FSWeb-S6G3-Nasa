import { getDateStr } from "../../helpers/Helper";

export default function Details({captionsVisible, apodDetails}){
    return (

<div className="flex gap-10 lg:gap-20 flex-wrap lg:flex-nowrap">
  <div className="flex-0 grow shrink-1 lg:shrink-0">
   <div className={`${captionsVisible ? 'lg:max-w-sm' : ''}`}>
   <div>
   <h1 className="text-4xl font-bold">{apodDetails.title}</h1>
    
   </div>
   
   {captionsVisible && <div className="mt-6"><div className="mb-3">
   <h5 className="text-xl font-light text-zinc-50/75">{getDateStr(apodDetails.date)}</h5>
   </div>
   <div className="mb-6">
   <h5 className="text-xl font-light text-zinc-50/75">More: <a className="text-white underline">Visit NASA page<i className="inline-block ms-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
</i></a></h5>
   </div></div>}
   <div>
   
   </div>
   </div>
  </div>
{captionsVisible &&  <div className="flex-0">
    <div className="flex">
    <p className="text-justify">{apodDetails.explanation}</p>
   
    </div>
   
  </div>}
</div>
    )
}
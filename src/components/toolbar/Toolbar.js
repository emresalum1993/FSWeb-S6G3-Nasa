import { useState } from "react";
import { addSubDay, getDateStr } from "../../helpers/Helper";
import Datepicker from "react-tailwindcss-datepicker";
export default function Toolbar({
  loadingApodDetails,
  selectedDate,
  handleInsightsVisible,
  handleChangeCaptions,
  captionsVisible,
  handleDateChange,
  dominantColor
}) {
  let dateModalBox = null;
  // I'm using "click" but it works with any event
  document.addEventListener("click", (event) => {
    if (dateModalBox) {
      const isClickInside = dateModalBox.contains(event.target);
      const targetId = event.target.getAttribute("id");

      if (
        !isClickInside &&
        targetId !== "selector-button" &&
        targetId !== "selector-text"
      ) {
        setDateSelectorOpen(false);
      }
    }
  });

  const [dateSelectorOpen, setDateSelectorOpen] = useState(false);

  const [datePickerValue, setDatePickerValue] = useState({
    startDate: new Date(),
  });

  function getRandomDate(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }

  function handleValueChangeDatePicker(newValue) {
    setDatePickerValue(newValue);

    selectNewDate(new Date(newValue.startDate));
  }

  function handleRandomClick() {
    const random = getRandomDate(
      new Date("2012-02-12T01:57:45.271Z"),
      new Date()
    );
    selectNewDate(random);
  }
  const [validTomorrow, setValidTomorrow] = useState(false);
  function showInsights() {
    handleInsightsVisible(true);
  }
  function toggleDateSelector() {
    setDateSelectorOpen(!dateSelectorOpen);
  }
  function toggleCaptions() {
    handleChangeCaptions();
  }
  function selectNewDate(date) {
    handleDateChange(date);
    setDateSelectorOpen(false);

    checkValidTomorrow(date);
  }
  function selectYesterday() {
    const yd = new Date();
    yd.setDate(yd.getDate() - 1);
    selectNewDate(yd);
  }
  function changeDate(val) {
    const newDate = addSubDay(selectedDate, val);
    checkValidTomorrow(newDate);
    handleDateChange(newDate);
  }
  function checkValidTomorrow(val) {
    const prevDay = new Date();
    prevDay.setDate(prevDay.getDate() - 1);
    console.log(prevDay);
    console.log(val);
    if (val < prevDay) {
      setValidTomorrow(true);
    } else {
      setValidTomorrow(false);
    }
  }
  return (
    <div className="">
      <div className={`${dominantColor.isDark ? 'border-white/50' : 'border-slate-800/25'} w-100 text-center   border-t `}>
        <div className="flex w-100 justify-between pt-10 flex-wrap">
          <div className="flex-1">
            <button
              onClick={() => toggleCaptions()}
      
              className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none  gap-2 flex items-center justify-center p-3 rounded-lg hover:bg-white/25 transition-colors`}
            >
              {captionsVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}

              <label className="cursor-pointer">
                {captionsVisible ? "Hide Details" : "Show Details"}
              </label>
            </button>
          </div>
          <div className="flex-1 text-center align-middle justify-center flex items-center gap-2 relative">
            {!loadingApodDetails && (
              <div className="relative">
                <button
                  onClick={() => changeDate(-1)}
 
                  className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="relative">
              <button
                id="selector-button"
                onClick={() => toggleDateSelector()}
                className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors`}
  
              >
                {loadingApodDetails && (
                  <div className="text-center flex items-center">
                    <div
                      className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white/50 relative rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}

                <label id="selector-text" className="cursor-pointer">
                  {getDateStr(selectedDate)}
                </label>
              </button>

              {dateSelectorOpen && (
                <div
                  id="date-modal-box"
                  ref={(ref) => (dateModalBox = ref)}
                  className="bg-slate-900 p-2 absolute rounded-lg shadow-lg -translate-y-[calc(100%+50px)] left-1/2 -translate-x-1/2 min-w-[200px]"
                >
                  <ul className="asd list-none ">
                    <li className="">
                      <a
                        onClick={() => selectYesterday()}
                        className="hover:bg-slate-800 block p-2 rounded-lg cursor-pointer"
                      >
                        Yesterday
                      </a>
                    </li>

                    <li className="">
                      <a
                        className="hover:bg-slate-800  block p-2 rounded-lg cursor-pointer"
                        onClick={() => selectNewDate(new Date())}
                      >
                        Today
                      </a>
                    </li>
                    <li className="p-2">
                      <p className="text-sm text-white/50 text-center mb-3">
                        or select a date
                      </p>
                      <Datepicker
                        useRange={false}
                        value={datePickerValue}
                        asSingle={true}
                        minDate={new Date("2012-02-12")}
                        maxDate={new Date()}
                        onChange={(e) => handleValueChangeDatePicker(e)}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {!loadingApodDetails && (
              <button
                disabled={!validTomorrow}
                onClick={() => changeDate(1)}
                className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors`}
  
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex-1 flex items-center justify-end align-middle gap-2">
            <button
              onClick={() => handleRandomClick()}
              className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none gap-2 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors`}
  
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              <label className="cursor-pointer">Random</label>
            </button>
            <button
              onClick={() => showInsights()}
              className={`${dominantColor.isDark ? 'text-white' : 'text-slate-800/75'} appereance-none gap-2 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors`}
  
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
              <label className="cursor-pointer">Insights</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getDateStr } from "../../helpers/Helper";

export default function Details({ captionsVisible, apodDetails, dominantColor }) {
  const url =
    "https://apod.nasa.gov/apod/ap" +
    apodDetails.date.split("-")[0].slice(-2) +
    apodDetails.date.split("-")[1] +
    apodDetails.date.split("-")[2] +
    ".html";

  return (
    <div className="flex gap-10 lg:gap-10 flex-wrap lg:flex-nowrap">
      <div className="flex-0 grow shrink-1 lg:shrink-0">
        <div className={`${captionsVisible ? "lg:max-w-sm" : ""}`}>
          <div>
            <h1 className="text-4xl font-bold">{apodDetails.title}</h1>
          </div>

          {captionsVisible && (
            <div className="mt-6">
              <div className="mb-3">
                <h5 className={`${dominantColor?.isDark ? 'text-zinc-50/75' : 'text-slate-800/80' } text-xl font-light`}>
                  {getDateStr(apodDetails.date)}
                </h5>
              </div>
              <div className="mb-6">
                <h5 className={`${dominantColor?.isDark ? 'text-zinc-50/75' : 'text-slate-800/80' } text-xl font-light`}>
                  Credit:{" "}
                  <a
                  rel="noreferrer"
                    target="_blank"
                    href={url}
                   
                    className={`${dominantColor?.isDark ? 'text-white' : 'text-slate-900' } underline`}
                  >
                    Visit NASA page
                    <i className="inline-block ms-2">
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
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </i>
                  </a>
                </h5>
              </div>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {captionsVisible && (
        <div className="flex-0">
          <div className="flex">
            <p className="text-justify">{apodDetails.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

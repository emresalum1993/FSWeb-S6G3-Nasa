import { useEffect, useState } from "react";

export default function Insights({
  handleInsightsVisible,
  apodTitle,
  apodDesc,
}) {
  function changeInsightsVisible() {
    handleInsightsVisible(false);
  }
  const [questions, setQuestions] = useState([]);
  const [errorQuestions, setErrorQuestions] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const apiKey =
    "sk-" +
    14 / 2 +
    "XhfDYGJxGBpeGwLJOzUT3BlbkFJxjmpXeduFDE" +
    86 / 2 +
    "NbwzS8U";

  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

 
  const prompt = `I have a website to show APOD by Nasa with informations. I already have "Title" and "Description" but I want some extra information section to display. Thus I will give you the title and description and I want you to understand what is this picture about .Then i want you to create some more informations using description. But expand it and add more information to give detailed QAs only about the topic of the description. I want you to give me those insights in JSON format and in question/answer format. Generate maximum 4 QAs and give me the most detailed ones. 
    Title: ${apodTitle}
    Description: ${apodDesc}
    The resulting JSON object should be in this format: [{"q":"string","a":"string"].
    JSON Output (Max Tokens: ${1500}): `;

  const maxTokens = 1500; // Adjust as needed
  let responseText = "";

  useEffect(() => {
    //setLoadingQuestions(false)
    // setErrorQuestions(true)
    generateQuestions();
  }, []);

  async function retryRetriveQuestions() {
    generateQuestions();
  }

  async function generateQuestions() {
    setLoadingQuestions(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: maxTokens,
        }),
      });

      if (response.ok) {
        setErrorQuestions(false);
        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].text) {
          const responseText = data.choices[0].text;

          // Format the output as JSON or use as needed

          // Display the output
          // outputElement.textContent = JSON.stringify(outputJSON, null, 2);
          const resJSON = JSON.parse(responseText.trim())
          setQuestions(resJSON.map(item=>({...item, open : false})));
        } else {
          //outputElement.textContent = 'No response text received from the API.';
        }
      } else {
        setErrorQuestions(true);
        const data = await response.json();
        setErrorMsg(data.error.code);
        //outputElement.textContent = 'Error fetching data from the API.';
      }
      setLoadingQuestions(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorQuestions(true);
      setErrorMsg(error);
      //outputElement.textContent = 'An error occurred. Please check the console for details.';
    }

    
  }

  function openQuestion(title){
    setQuestions(questions.map(question=> question.q === title ? {...question,open : true} : {...question,open:false}));
  }
  return (
    <div className="fixed w-screen h-screen bg-black/50 top-0 left-0 z-20 flex text-start items-center justify-center">
      <div className=" p-12">
        <div className="card  bg-slate-900 max-w-screen-xs max-w-full  lg:max-w-2xl rounded-lg shadow-2xl">
          <div className="card-header p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold ">
                  <i className="inline-block me-3 text-teal-500">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </i>
                  AI Generated Insights
                </h1>
              </div>
              <div className="text-end">
                <button
                  onClick={() => changeInsightsVisible()}
                  className="appereance-none text-white/75 gap-4 flex items-center justify-center p-2 rounded-full hover:bg-white/25 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p className="text-white/40 mt-2">
                Discover space's sSecrets with AI-crafted cosmic insights
              </p>
            </div>
          </div>
          <div className="card-body pb-6">
            <div className="overflow-auto max-h-[calc(100vh-200px)] overflow-x-hidden">
              {!loadingQuestions && !errorQuestions ? (
                <div>
                  {" "}
                  <ul className="list-none divide-y divide-white/10">
                    {questions.map((question) => (
                      <li key={question.q} className="pb-6 pt-6 p-6 ">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between  mb-1">
                              <div>
                                <p className="text-white font-bold">
                                  {question.q}
                                </p>
                              </div>
                              <div className="text-end">
                                <button onClick={()=>openQuestion(question.q)} className="appereance-none text-white/75 gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors">
                                
                                {!question.open &&   <svg
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
                                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                  </svg>}
                                  {question.open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>
}
                                </button>
                              </div>
                            </div>
                         {question.open &&    <div>
                              <p className="text-white/80 text-sm font-light">
                                {question.a}
                              </p>
                            </div>}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {!loadingQuestions && errorQuestions ? (
                <div className="px-6 py-3">
                  {" "}
                  <div className="text-center rounded-lg bg-red-500/10 py-6 flex flex-col text-center items-center justify-center">
                    <div>
                      <i className="block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </i>
                    </div>
                    <div>
                      <h6 className="text-lg font-bold text-white mb-1 mt-3">
                        An erorr occurred
                      </h6>
                    </div>
                    <div>
                      <p className="text-white/50 px-4">
                        Could not complete request. Please try again after few
                        minutes <br></br>
                        {errorMsg}
                      </p>
                    </div>
                    <div className="pt-5">
                      <button
                        onClick={() => retryRetriveQuestions()}
                        className="appereance-none text-white/75 gap-2 flex items-center justify-center p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
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
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>

                        <label className="cursor-pointer">Retry</label>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {loadingQuestions && (
                <div className="text-center p-6">
                  <div
                    className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-teal-600 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <div className="text-center flex items-center justify-center mt-0 mb-2"></div>
              <div className="text-center text-xs text-white/25 mt-5">
                Powered by{" "}
                <a
                  href="https://chat.openai.com/"
                  className="text-teal-800 font-bold"
                >
                  ChatGPT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

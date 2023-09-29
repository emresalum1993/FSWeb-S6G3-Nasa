export default function Header({
  handleFullScreenChange,
  fullScree,
  imageURL,
  imageName,
}) {
  const shareAvailable = navigator?.share;
  function changeFullScreen() {
    handleFullScreenChange();
    document.documentElement.requestFullscreen();
  }
  function downloadImage() {
    var link = document.createElement("a");
    link.href = imageURL;
    link.download = imageName + ".jpg";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function shareButton() {
    navigator.share("test");
  }

  return (
    <header>
      <div className="flex align-middle justify-between items-center">
        <div>
          <a className="block">
            <svg
              className="w-20"
              viewBox="0 0 384 241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M92 50C92 53.866 88.866 57 85 57C81.134 57 78 53.866 78 50C78 46.134 81.134 43 85 43C88.866 43 92 46.134 92 50Z"
                fill="#FF0000"
              />
              <path
                d="M92 50C92 53.866 88.866 57 85 57C81.134 57 78 53.866 78 50C78 46.134 81.134 43 85 43C88.866 43 92 46.134 92 50Z"
                fill="white"
              />
              <path
                d="M113 17.5C113 27.165 105.165 35 95.5 35C85.835 35 78 27.165 78 17.5C78 7.83502 85.835 0 95.5 0C105.165 0 113 7.83502 113 17.5Z"
                fill="white"
              />
              <path
                d="M325 191.5C325 197.299 320.299 202 314.5 202C308.701 202 304 197.299 304 191.5C304 185.701 308.701 181 314.5 181C320.299 181 325 185.701 325 191.5Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M383.636 151.88C383.636 159.907 381.77 165.6 378.036 168.96C374.396 172.32 368.33 174 359.836 174H330.996V76H358.156C366.556 76 372.903 77.7267 377.196 81.18C381.49 84.54 383.636 90.0933 383.636 97.84V151.88ZM368.656 89.3C370.523 91.0733 371.456 93.5 371.456 96.58V153.28C371.456 156.827 370.616 159.44 368.936 161.12C367.256 162.707 364.643 163.5 361.096 163.5H343.176V86.5H361.236C364.316 86.5 366.79 87.4333 368.656 89.3Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.22 149.22L12.76 174H0.300003L23.96 76H40.06L63.3 174H50.84L45.52 149.22H18.22ZM31.8 85.24L43.28 138.72H20.46L31.8 85.24Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M257 207.5C257 197.835 264.835 190 274.5 190C278.982 190 283.07 191.685 286.166 194.456C300.51 175.211 309 151.347 309 125.5C309 61.7111 257.289 10 193.5 10C129.711 10 78 61.7111 78 125.5C78 189.289 129.711 241 193.5 241C218.838 241 242.271 232.841 261.314 219.006C258.628 215.93 257 211.905 257 207.5ZM159.625 130.6C163.639 126.96 165.645 121.36 165.645 113.8V97.84C165.645 90.28 163.592 84.7733 159.485 81.32C155.472 77.7733 149.499 76 141.565 76H115.105V174H127.285V135.92H141.845C149.685 135.92 155.612 134.147 159.625 130.6ZM270.231 168.12C274.618 164.107 276.811 158.133 276.811 150.2V99.8C276.811 91.8667 274.618 85.94 270.231 82.02C265.938 78.0067 259.731 76 251.611 76H246.011C237.891 76 231.638 78.0067 227.251 82.02C222.958 85.94 220.811 91.8667 220.811 99.8V150.2C220.811 158.133 222.958 164.107 227.251 168.12C231.638 172.04 237.891 174 246.011 174H251.611C259.731 174 265.938 172.04 270.231 168.12Z"
                fill="white"
              />
              <path
                d="M264.631 97.14C264.631 94.2467 263.558 91.7733 261.411 89.72C259.264 87.6667 256.464 86.64 253.011 86.64H244.611C241.158 86.64 238.358 87.6667 236.211 89.72C234.064 91.7733 232.991 94.2467 232.991 97.14V152.86C232.991 155.753 234.064 158.227 236.211 160.28C238.358 162.333 241.158 163.36 244.611 163.36H253.011C256.464 163.36 259.264 162.333 261.411 160.28C263.558 158.227 264.631 155.753 264.631 152.86V97.14Z"
                fill="white"
              />
              <path
                d="M153.465 96.58C153.465 93.0333 152.625 90.4667 150.945 88.88C149.359 87.2933 146.792 86.5 143.245 86.5H127.285V125.42H143.245C146.792 125.42 149.359 124.627 150.945 123.04C152.625 121.36 153.465 118.747 153.465 115.2V96.58Z"
                fill="white"
              />
              <path
                d="M274.5 190C264.835 190 257 197.835 257 207.5C257 211.905 258.628 215.93 261.314 219.006C270.786 212.125 279.172 203.839 286.166 194.456C283.07 191.685 278.982 190 274.5 190Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <div className="text-end flex gap-5 items-center justify-end">
          {shareAvailable && (
            <button
              onClick={() => shareButton()}
              className=" appereance-none text-white/75 gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors bg-white/10"
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
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => downloadImage()}
            className="appereance-none text-white/75 gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors bg-white/10"
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
          <button
            onClick={() => changeFullScreen()}
            className="appereance-none text-white/75 gap-4 flex items-center justify-center p-3 rounded-full hover:bg-white/25 transition-colors bg-white/10"
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
                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

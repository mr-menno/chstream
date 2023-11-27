import { useEffect, useState } from "react";
import Broadcast from "./Components/Broadcast";
import { PeerProvider } from "./Helpers/PeerContext";
import Monitor from "./Components/Monitor";

function App() {
  let [mode, setMode] = useState(localStorage.getItem('app_mode') || "initial");

  useEffect(() => {
    let qs = new URLSearchParams(window.location.search);
    if(qs.has('monitor')) {
      setMode('monitor');
    }
    if(localStorage.getItem('monitor')) {
      setMode('monitor');
    }
    if(localStorage.getItem('broadcast')) {
      setMode('broadcast');
    }
  },[])

  return (
    <PeerProvider>
      <div className="w-full h-screen flex bg-gray-900 text-gray-400">
        <div className="w-full max-w-lg mx-auto my-auto md:border border-t border-b border-gray-500 md:rounded-lg flex flex-col ">
            {mode!=="initial" ? (
              <div className="border-b px-4 py-2 border-gray-500 flex flex-row">
                <div className="flex-grow font-bold text-2xl">
                  {mode==="broadcast" ? "Broadcast Audio":null}
                  {mode==="monitor" ? "Monitor Audio":null}
                </div>
                <div className="my-auto space-x-2">
                  <span onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}>RESET</span>
                  <span onClick={() => setMode("initial")}>STOP</span>
                </div>
              </div>
            ):null}
          <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0">
          {mode == "broadcast" ? <Broadcast /> : null}
          {mode == "monitor" ? <Monitor />: null}
          {mode == "initial" ? <>
            <div
              className="md:pr-4 flex-grow md:w-1/2  flex-col text-center"
              onClick={() => setMode("broadcast")}
            >
              <button className="bg-gray-700 rounded-md w-full py-2 hover:outline outline-gray-700 border-2 border-gray-800 text-2xl justify-self-center">
                <div>Broadcast Audio</div>
                <div  >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                </div>
              </button>
            </div>
            <div 
            className="md:last:border-l last:border-gray-500 md:w-1/2 md:pl-4 flex-col text-center"
            onClick={() => setMode("monitor")}
            >
              <button className="bg-gray-700 rounded-md w-full py-2 hover:outline outline-gray-700 border-2 border-gray-800 text-2xl">
                <div>
                  Monitor Audio
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </button>
            </div>
          </> : null}

        </div>
        </div>
      </div>
    </PeerProvider>
  );
}

export default App;

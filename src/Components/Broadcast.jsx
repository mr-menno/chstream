import { useEffect, useState } from "react";
import Stream from "../Helpers/Stream";
import { usePeer } from "../Helpers/PeerContext";
import QRCode from "react-qr-code";

function Broadcast() {
    let [audioSrc, setAudioSrc] = useState();
    let [channel, setChannel] = useState("");

    const peer = usePeer();

    function save() {
        localStorage.setItem('broadcast',channel);
        location.reload();
    }
    useEffect(() => {
        let getMediaStream = async () => {
            setAudioSrc(await window.mediaStream.getMediaStream({
                audio: {
                    autoGainControl: false,
                    noiseSuppression: false,
                    echoCancellation: false
                }
            }));
        }
        getMediaStream();

    }, []);
    
    const monitorUrl = `${window.location.href}?monitor=${peer.id}`;

    return (
        <div className="w-full text-center flex flex-col justify-center pb-4 space-y-4">
            <div className="flex flex-col md:flex-row space-x-2">
                <div className="text-2xl my-auto">Channel: </div>
                <input
                    className="flex-grow bg-gray-800 border-b-2 border-gray-700 text-2xl text-center placeholder:text-gray-700 outline-none"
                    value={channel}
                    placeholder={peer.id}
                    onChange={e => {
                        setChannel(e.target.value);
                    }}
                />
                <button disabled={peer.id===channel || !channel} className="bg-gray-700 rounded-md px-2 py-2 hover:outline outline-gray-700 border-2 border-gray-800 text-2xl disabled:bg-gray-800 disabled:text-gray-700" 
                    onClick={() => save()}>
                    save
                </button>
            </div>
            
            <QRCode value={monitorUrl} renderAs={"svg"} fgColor="rgb(156 163 175)" bgColor="rgb(17 24 39)" className="mx-auto"/>
            <a href={monitorUrl} className="underline text-gray-600">monitor link</a>
        </div>
    )
}

export default Broadcast;
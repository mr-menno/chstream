import { useEffect, useRef, useState } from "react";
import { usePeer } from "../Helpers/PeerContext";

function Receive() {
    const peer = usePeer();

    let [channel, setChannel] = useState("");
    let [playing, setPlaying] = useState(false);
    let [currentTime,setCurrentTime] = useState("");
    const audioRef = useRef(null);

    function connect(_channel) {
        _channel = _channel || channel;
        console.log('connectingto', _channel);
        // let localAudioStream = new MediaStream();
        var conn = peer.call(_channel, window.mediaStream.localAudioStream);
        // var conn = peer.call(_channel,localAudioStream);
        conn.on('stream', (stream) => {
            try {
                console.log('Got Stream');
                audioRef.current.srcObject = stream;
                window.audioRef = audioRef;
                setPlaying(true);
            } catch(e) { console.error(e); }
        })
    }

    useEffect(() => {
        let getMediaStream = async () => {
            await window.mediaStream.getMediaStream({ video: false, audio: true });
        }
        getMediaStream();

    }, []);

    useEffect(() => {
        let qs = new URLSearchParams(window.location.search);
        if (qs.has('monitor')) {
            console.log('setting channel ', qs.get('monitor'))
            setChannel(qs.get('monitor'));
            setTimeout(() => {
                connect(qs.get('monitor'));
            }, 1000);
        }
        if(localStorage.getItem('monitor')) {
            console.log('setting channel ', localStorage.getItem('monitor'))
            setChannel(localStorage.getItem('monitor'));
            setTimeout(() => {
                connect(localStorage.getItem('monitor'));
            }, 1000);
        }
        audioRef.current.addEventListener('ended', () => setPlaying(false));
        audioRef.current.addEventListener('pause', () => setPlaying(false));

        let _tmrCurrentTime = setInterval(() => {
            setCurrentTime(Math.floor(audioRef?.current?.currentTime));
        },1000)
        return () => {
            clearInterval(_tmrCurrentTime);
            Object.keys(peer.connections).forEach(ch => {
                if (ch.close) {
                    ch.close();
                }
            });
        }
    }, []);

    return (
        <>
            <div className="flex-col text-center w-full space-y-4">
                <input
                    className="bg-gray-800 border-b-2 border-gray-700 text-2xl w-full text-center placeholder:text-gray-700 outline-none"
                    disabled={playing}
                    value={channel}
                    placeholder="channel ID"
                    onChange={e => {
                        setChannel(e.target.value);
                        localStorage.setItem('monitor',e.target.value)
                    }}
                />
                <button disabled={playing} className="bg-gray-700 rounded-md w-full py-2 hover:outline outline-gray-700 border-2 border-gray-800 text-2xl disabled:bg-gray-800 disabled:text-gray-700" onClick={() => connect()}>
                    {playing ? "connected - "+currentTime: "Connect to Channel"}
                </button>
            </div>
            <div>
                <audio ref={audioRef} autoPlay />
            </div>

        </>
    )
}

export default Receive;
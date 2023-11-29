

class Stream {
    constructor() {
        return this;
    }

    getMediaStream = ({ video, audio }={}) => {
        let that = this;
        video = video || false;
        audio = audio || false;
        return new Promise((resolve, reject) => {
            navigator.getUserMedia(
                {
                    video: video,
                    audio: audio
                },
                function success(stream) {
                    that.localAudioStream = stream;
                    resolve(stream);
                },
                function error(err) {
                    console.error(err);
                    reject(err);
                }
            );
        });
    }

    getAudioContext = () => {
        let that = this;
        return new Promise(async (resolve,reject) => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: {
                    autoGainControl: false,
                    noiseSuppression: false,
                    echoCancellation: false
                }
            });
            that.audioContext = new AudioContext();
            that.sourceNode = that.audioContext.createMediaStreamSource(stream);
            that.destinationNode = that.audioContext.createMediaStreamDestination();
            that.analyserNode = that.audioContext.createAnalyser();
            that.gainNode = that.audioContext.createGain();
            that.sourceNode.connect(that.gainNode);
            that.gainNode.connect(that.analyserNode);
            that.gainNode.connect(that.destinationNode);
            // that.sourceNode.connect(that.destinationNode);
            window.ms = {stream:that.destinationNode.stream,analyser:that.analyserNode,gain:that.gainNode};
            return resolve({stream:that.destinationNode.stream,analyser:that.analyserNode,gain:that.gainNode});
        });
    }
}

window.mediaStream = new Stream();
export default Stream;
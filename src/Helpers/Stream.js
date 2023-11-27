

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
}

window.mediaStream = new Stream();
export default Stream;
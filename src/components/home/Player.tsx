import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // Đảm bảo bạn đã cài đặt và nhập CSS
import "@/styles/audioplayer.css";

export default function Player() {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AudioPlayer
          src="http://localhost:8000/media/songs/audio/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_ETA_Official_MV_320_kbps.mp3"
          volume={1}
        />
      </div>
    </div>
  );
}

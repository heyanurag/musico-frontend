import { useRecoilState } from "recoil";
import { nowPlaying } from "../atoms";
import { AudioCard } from "material-ui-player";

const AudioPlayer = () => {
  const [nowP, setNowP] = useRecoilState(nowPlaying);

  return (
    <AudioCard
      src={nowP ? nowP.preview_url : ""}
      thickness="thin"
      color="secondary"
      mute
      width={300}
      // autoplay
    />
  );
};

export default AudioPlayer;

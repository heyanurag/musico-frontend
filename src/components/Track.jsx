import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LaunchIcon from "@mui/icons-material/Launch";

import { useRecoilState } from "recoil";
import { nowPlaying } from "../atoms";

const Track = ({ track }) => {
  const [nowP, setNowP] = useRecoilState(nowPlaying);
  return (
    <Grid
      container
      sx={{ padding: 0.5 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Grid
          container
          columnSpacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <img src={track.album.images[2].url} />
          </Grid>
          <Grid item>
            <div>{track.name}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton href={track.external_urls.spotify} target="_blank">
          <LaunchIcon />
        </IconButton>
        <IconButton onClick={() => setNowP(track)}>
          {nowP && nowP.preview_url === track.preview_url ? (
            <PauseCircleIcon />
          ) : (
            <PlayCircleIcon />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Track;

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { useState, useEffect } from "react";
import { AudioCard } from "material-ui-player";
import Webcam from "react-webcam";
import { useRecoilState } from "recoil";
import { nowPlaying, tracks } from "../atoms";
import axiosInstance from "../axios";
import ImageSlider from "./ImageSlider";
import Track from "./Track";

const videoConstraints = {
  facingMode: "user",
};

const AudioPlayer = () => {
  const [nowP, setNowP] = useRecoilState(nowPlaying);

  return (
    <AudioCard
      src={nowP ? nowP.preview_url : ""}
      thickness="thin"
      color="secondary"
      mute
      width={300}
      autoplay
    />
  );
};

const Home = () => {
  const [mood, setMood] = useState(null);
  const [trks, settrks] = useRecoilState(tracks);
  // const [tracks, setTracks] = useState([]);
  const [nowP, setNowP] = useRecoilState(nowPlaying);
  const handleSearch = (event) => {
    if (event.keyCode !== 13 || event.target.value === "") return;

    // fetch search result
  };

  const fetchMusic = (image) => {
    //AXIOS REQUEST HERE
    const imageData = { image };
    console.log(imageData);
    axiosInstance.post("mood/get_mood", imageData).then((res) => {
      // console.log(res.data);
      const data = res.data;
      console.log(data);
      const songs = data.tracks.filter((tr) => tr.preview_url !== null);
      console.log(songs);
      setMood(data.mood);
      settrks(songs);
    });
  };

  useEffect(() => {
    if (trks.length === 0) {
      axiosInstance.get("mood/get_popular").then((res) => {
        const data = res.data;
        console.log(data);
        const songs = data.tracks.filter((tr) => tr.preview_url !== null);
        console.log(songs);
        settrks(songs);
      });
    }
  }, []);

  return (
    <>
      {/* <Box sx={{display: "flex", flexDirection: "column"}}> */}
      {/* <TextField
        fullWidth
        id="search"
        name="search"
        label="Search Music"
        placeholder="E.g. Uptown Fun"
        onKeyDown={handleSearch}
      /> */}
      {/* <ImageSlider /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: 625,
              // "&:hover": {
              //   opacity: [0.9, 0.8, 0.7],
              // },
              overflow: "scroll",
            }}
          >
            {trks.length > 0
              ? trks.map((tr) => (
                  <div key={tr.uri}>
                    <Track track={tr} />
                    <Divider />
                  </div>
                ))
              : "Try Moodify Today"}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Webcam
            audio={false}
            width={400}
            videoConstraints={videoConstraints}
            mirrored={true}
          >
            {({ getScreenshot }) => (
              <Grid
                container
                pt={1}
                pb={1}
                justifyContent="space-between"
                alignItems="center"
                spacing={5}
              >
                <Grid item xs={7}>
                  {mood && (
                    <Typography component="div">You are {mood}.</Typography>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const imageSrc = getScreenshot();
                      fetchMusic(imageSrc);
                    }}
                  >
                    Analyse Mood
                  </Button>
                </Grid>
              </Grid>
            )}
          </Webcam>
        </Grid>
      </Grid>
      <AudioPlayer />
      {/* <Box compo sx={{flex: 1, bgcolor: "#ff0000"}} /> */}
    </>
  );
};

export default Home;

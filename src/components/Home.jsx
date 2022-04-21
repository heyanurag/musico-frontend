import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Webcam from "react-webcam";
import ImageSlider from "./ImageSlider";

const videoConstraints = {
  facingMode: "user",
};

const Home = () => {
  const handleSearch = (event) => {
    if (event.keyCode !== 13 || event.target.value === "") return;

    // fetch search result
  };

  const fetchMusic = (image) => {
    //AXIOS REQUEST HERE
    console.log(image);
  };

  return (
    <>
      {/* <Box sx={{display: "flex", flexDirection: "column"}}> */}
      <TextField
        fullWidth
        id="search"
        name="search"
        label="Search Music"
        placeholder="E.g. Uptown Fun"
        onKeyDown={handleSearch}
      />

      <ImageSlider />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: 300,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
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
                  <Typography component="div">You are Happy!</Typography>
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
      {/* <Box compo sx={{flex: 1, bgcolor: "#ff0000"}} /> */}
    </>
  );
};

export default Home;

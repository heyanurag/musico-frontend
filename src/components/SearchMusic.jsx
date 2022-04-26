import ImageSlider from "./ImageSlider";
import AudioPlayer from "./AudioPlayer";
import Track from "./Track";
import { useRecoilState } from "recoil";
import { searchedMusicState } from "../atoms";

import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import axiosInstance from "../axios";

const SearchMusic = () => {
  const [searchedMusic, setSearchedMusic] = useRecoilState(searchedMusicState);

  const handleSearch = (event) => {
    if (event.keyCode !== 13 || event.target.value === "") return;

    const query = event.target.value.trim();
    console.log(query);

    if (query.length < 4) return;

    axiosInstance
      .get(`mood/get_search_result?searchQuery=${query}`)
      .then((res) => {
        const data = res.data;
        const songs = data.tracks.filter((tr) => tr.preview_url !== null);
        setSearchedMusic(songs);
      });
  };

  return (
    <div>
      <TextField
        fullWidth
        id="search"
        name="search"
        label="Search Music"
        placeholder="E.g. Uptown Fun"
        onKeyDown={handleSearch}
      />
      <ImageSlider />
      <Box
        sx={{
          height: 275,
          // "&:hover": {
          //   opacity: [0.9, 0.8, 0.7],
          // },
          overflow: "scroll",
        }}
      >
        {searchedMusic.length > 0
          ? searchedMusic.map((tr) => (
              <div key={tr.uri}>
                <Track track={tr} />
                <Divider />
              </div>
            ))
          : "Try Moodify Search"}
      </Box>
      <AudioPlayer />
    </div>
  );
};

export default SearchMusic;

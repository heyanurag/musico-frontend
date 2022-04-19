import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ImageSlider from "./ImageSlider";

const Home = () => {
  const handleSearch = (event) => {
    if (event.keyCode !== 13 || event.target.value === "") return;

    // fetch search result
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
      {/* <Box compo sx={{flex: 1, bgcolor: "#ff0000"}} /> */}
    </>
  );
};

export default Home;

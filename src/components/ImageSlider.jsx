import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import { topMusicState, nowPlaying } from "../atoms";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { drawerWidth } from "./Header";
import makeStyles from "@mui/styles/makeStyles";
import axiosInstance from "../axios";

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    position: "absolute",
    top: "35%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.8,
    "& .icon": {
      fontSize: 35,
      color: "#fff",
    },
    "&:hover .icon": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      // top: "35%",
      "& .icon": {
        fontSize: 30,
      },
    },
  },
}));

export default function ImageSlider() {
  const [topMusic, setTopMusic] = useRecoilState(topMusicState);
  const [nowP, setNowP] = useRecoilState(nowPlaying);
  const [scrollX, setScrollX] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const listRef = useRef(null);
  const classes = useStyles();

  const handleClick = (tr) => {
    setNowP(tr);
  };

  const handleNext = () => {
    let width = scrollX + windowWidth - drawerWidth;

    if (width > listRef.current.scrollWidth)
      width = listRef.current.scrollWidth;

    setScrollX(width);
    setIsEnd(listRef.current.scrollWidth - width < windowWidth - drawerWidth);
    listRef.current.scrollTo(width, 0);
  };

  const handlePrev = () => {
    let width = scrollX - windowWidth - drawerWidth;

    if (width < 0) width = 0;

    setScrollX(width);
    setIsEnd(false);
    listRef.current.scrollTo(width, 0);
  };

  useEffect(() => {
    axiosInstance.get("mood/get_popular").then((res) => {
      const data = res.data;
      const songs = data.tracks.filter((tr) => tr.preview_url !== null);
      setTopMusic(songs);
    });
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" noWrap component="div">
        Top Music to listen
      </Typography>
      <Box sx={{ position: "relative", mx: -2 }}>
        <ImageList
          ref={listRef}
          sx={{
            display: "flex",
            scrollBehavior: "smooth",
            width: { xs: windowWidth, sm: windowWidth - drawerWidth },
          }}
          gap={10}
        >
          <Box sx={{ ml: 1 }} />
          {topMusic.map((tr) => (
            <ImageListItem key={tr.uri}>
              <img
                src={tr.album.images[1].url || ""}
                alt={tr.name}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 15,
                  cursor: "pointer",
                }}
                onClick={() => handleClick(tr)}
              />

              <ImageListItemBar
                sx={{
                  // background:
                  //   "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  //   "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  backgroundColor: "rgba(0,0,0,.7)"
                }}
                title={tr.name}
                position="bottom"
                // actionIcon={
                //   <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} htmlColor="#fff" />
                // }
                actionPosition="right"
              />
            </ImageListItem>
          ))}
          <Box sx={{ ml: 1 }} />
        </ImageList>

        {/* <div style={{display: "flex"}}>
          {topMusic.map(({ id, name, imgUrl }) => (
            <img
            src={imgUrl}
            alt={name}
            style={{
              width: 200,
              height: 200,
              borderRadius: 15,
              cursor: "pointer",
            }}
            onClick={() => handleClick(id)}
          />
          ))}
        </div> */}

        {scrollX !== 0 && (
          <IconButton
            sx={{ left: 0, pr: 1 }}
            className={classes.iconBtn}
            onClick={handlePrev}
          >
            <ArrowBackIosNewIcon className="icon" />
          </IconButton>
        )}
        {!isEnd && (
          <IconButton
            sx={{ right: 0, pl: 1 }}
            className={classes.iconBtn}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon className="icon" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

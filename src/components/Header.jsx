import { Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container>
      <Typography align="center" variant="h2" gutterBottom pt={5}>
        Musico 🎶
      </Typography>
      <Typography align="center" gutterBottom>
        Explore Top Music Powered by your Scrobbles!
      </Typography>
    </Container>
  );
};

export default Header;

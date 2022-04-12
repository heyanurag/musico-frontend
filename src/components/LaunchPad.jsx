import { Link, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../atoms";

const LaunchPad = () => {
  const loggedIn = useRecoilValue(isLoggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: "/app" }} replace />;
  }

  return <div>LaunchPad</div>;
};

export default LaunchPad;

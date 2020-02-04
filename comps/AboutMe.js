import Home from "./Home";
import styles from "../styles/styles.scss";

export default function AboutMe() {
  return (
    <header>
      <div class="overlay"></div>
      <video
        playsinline="playsinline"
        autoPlay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source
          src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
          type="video/mp4"
        />
      </video>
    </header>
  );
}

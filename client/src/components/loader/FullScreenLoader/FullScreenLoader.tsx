import "./FullScreenLoader.scss";
// import { RotatingLines } from "react-loader-spinner";

interface FullScreenLoaderProps {
  color?: string;
  width?: string;
  loadingText?: string;
}

const FullScreenLoader = ({
  loadingText = "loading...",
  width = "60",
  color = "#5175d9",
}: FullScreenLoaderProps) => {
  return (
    <div className="fullscreen-loader">
      <div className="container">
        <div>
          {/* <RotatingLines
            width={width}
            visible={true}
            strokeWidth="5"
            strokeColor={color}
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          /> */}
        </div>
        <div>{loadingText}</div>
      </div>
    </div>
  );
};

export default FullScreenLoader;

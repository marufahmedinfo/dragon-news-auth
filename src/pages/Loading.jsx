import { RingLoader } from "react-spinners";


const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
      <span className="loading loading-bars loading-lg"></span>
      <RingLoader />
    </div>
    );
};

export default Loading;
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <BounceLoader color="#ff9101" size={100} />
    </div>
  );
};

export default Loading;

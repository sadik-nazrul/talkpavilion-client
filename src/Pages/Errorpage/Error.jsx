import { Link } from "react-router-dom";
import PageTitle from "../../Components/PageTitle";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2">
      <PageTitle title={"Error Page"} />
      <h2 className="text-6xl font-bold">Ooops..!!!</h2>
      <p className="font-medium">Something Went Wrong</p>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
};

export default Error;

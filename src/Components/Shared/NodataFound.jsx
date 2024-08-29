import React from "react";
import PageTitle from "../PageTitle";
import { Link } from "react-router-dom";

const NodataFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2">
      <PageTitle title={"No Data Found"} />
      <h2 className="text-6xl font-bold">Ooops..!!!</h2>
      <p className="font-medium">No Data Found</p>
      <Link to="/dashboard" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
};

export default NodataFound;

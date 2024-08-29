import useAuth from "../../../../Hooks/useAuth";
import useUser from "../../../../Hooks/useUser";
import bronze from "../../../../assets/Bronze.png";
import gold from "../../../../assets/gold.png";
import admin from "../../../../assets/admin.png";
import { BsEnvelope } from "react-icons/bs";

const Profile = () => {
  const { user } = useAuth();
  const [userDetails] = useUser();
  console.log(userDetails);

  const mail = `mailto:${userDetails?.email}`;

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center lg:w-1/2 w-full p-6 shadow-md rounded-xl sm:px-12 bg-orange-100">
        <div className="relative">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
          />
          {userDetails?.role === "bronze" && (
            <img
              className="w-14 absolute top-0 lg:right-36 right-32"
              src={bronze}
              alt={userDetails?.role}
            />
          )}
          {userDetails?.role === "gold" && (
            <img
              className="w-14 absolute top-0 right-5"
              src={gold}
              alt={userDetails?.role}
            />
          )}
          {userDetails?.role === "admin" && (
            <img
              className="w-14 absolute top-0 right-5"
              src={admin}
              alt={userDetails?.role}
            />
          )}
        </div>
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user?.displayName}
            </h2>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <a href={mail}>
              <BsEnvelope size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

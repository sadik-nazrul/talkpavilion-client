import { GrAnnounce } from "react-icons/gr";

const Announcement = ({ announcement }) => {
  return (
    <div className="lg:bg-Anounce-bg lg:h-[80vh] bg-cover bg-no-repeat bg-center">
      <div className="grid lg:grid-cols-2 container mx-auto h-full p-10 gap-4">
        <div>
          <GrAnnounce size={100} className="lg:hidden md:hidden block" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h2 className="lg:text-4xl text-2xl font-bold">
            {announcement?.title}
          </h2>
          <p className="text-gray-500">{announcement?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;

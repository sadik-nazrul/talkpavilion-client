import PageTitle from "../../../Components/PageTitle";
import useAnnouncements from "../../../Hooks/useAnnouncements";
import Announcement from "../Component/Announcement";
import Blogs from "../Component/Blogs";
import BlogSearch from "../Component/BlogSearch";

const Home = () => {
  const [announcements] = useAnnouncements();
  return (
    <div>
      <PageTitle title={"Home"} />
      <BlogSearch />
      {announcements?.length > 0 && (
        <div>
          {announcements.map((announcement, idx) => (
            <Announcement key={idx} announcement={announcement} />
          ))}
        </div>
      )}
      <Blogs />
    </div>
  );
};

export default Home;

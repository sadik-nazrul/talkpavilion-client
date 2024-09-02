import PageTitle from "../../../Components/PageTitle";
import Loading from "../../../Components/Shared/Loading";
import useAnnouncements from "../../../Hooks/useAnnouncements";
import Announcement from "../Component/Announcement";
import Blogs from "../Component/Blogs";
import BlogSearch from "../Component/BlogSearch";

const Home = () => {
  const [announcements, isLoading] = useAnnouncements();
  return (
    <div>
      <PageTitle title={"Home"} />
      <BlogSearch />
      <div>
        {isLoading && <Loading />}
        {announcements?.length > 0 && (
          <div>
            {announcements.map((announcement, idx) => (
              <Announcement key={idx} announcement={announcement} />
            ))}
          </div>
        )}
      </div>
      <div>
        <Blogs />
      </div>
    </div>
  );
};

export default Home;

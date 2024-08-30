import PageTitle from "../../../Components/PageTitle";
import Announcement from "../Component/Announcement";
import Blogs from "../Component/Blogs";
import BlogSearch from "../Component/BlogSearch";

const Home = () => {
  return (
    <div>
      <PageTitle title={"Home"} />
      <BlogSearch />
      <Announcement />
      <Blogs />
    </div>
  );
};

export default Home;

import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>TalkPavilion || {title}</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;

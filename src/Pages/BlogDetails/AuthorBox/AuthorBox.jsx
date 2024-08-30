import { FaEnvelope } from "react-icons/fa6";

const AuthorBox = ({ photo, name, email }) => {
  const mail = `mailto:${email}`;
  return (
    <>
      <h2 className="text-xl font-bold">Author</h2>
      <div className="flex gap-4 items-center shadow p-5 rounded-xl">
        <img className="w-14" src={photo} alt={name} />
        <div>
          <h2 className="text-xl font-medium">{name}</h2>
          <a className="flex gap-2 items-center" href={mail}>
            <FaEnvelope />
            {name}
          </a>
        </div>
      </div>
    </>
  );
};

export default AuthorBox;

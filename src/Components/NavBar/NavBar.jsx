import { useEffect, useState } from "react";
import logo from "../../assets/talkpavilion-logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  /* ===Scrolling Feature START=== */
  //   State
  const [scrolling, setScrolling] = useState(false);
  //   Handlescroll function
  const handleScroll = () => {
    if (window.scrollY) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  //   Effact
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  /* ===Scrolling Feature END=== */

  /* ===NavLinks=== START */
  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary px-5 py-2 rounded text-white" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            isActive ? "bg-primary px-5 py-2 rounded text-white" : ""
          }
        >
          Membership
        </NavLink>
      </li>
    </>
  );
  /* ===NavLinks=== END */
  return (
    <div
      className={
        scrolling
          ? `bg-white text-black shadow z-[99] navbar lg:px-20 sticky top-0`
          : `navbar lg:px-20 sticky top-0 z-[99]`
      }
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="talkpavilion" className="w-40" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal gap-4 px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <details className="dropdown">
          <summary className="btn btn-link m-1">
            {user ? (
              <img
                className="w-10 rounded-full"
                src={user?.photoURL}
                alt={user?.displayName}
              />
            ) : (
              <FaCircleUser size={40} className="text-black" />
            )}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
            {user ? (
              <>
                <li className="text-center font-bold capitalize">
                  {user?.displayName}
                </li>
                <li>
                  <NavLink to="/dashboard">DashBoard</NavLink>
                </li>
                <li>
                  <button onClick={logOut} className="btn btn-primary">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default NavBar;

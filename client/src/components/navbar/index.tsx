import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";

const navLink = [
  { to: "/", name: "Overview" },
  { to: "/purchase", name: "Purchase" },
  { to: "/stocks", name: "Stocks" },
  { to: "/sales", name: "Sales" },
];

const Navbar = () => {
  const { pathname: activeLink } = useLocation();

  /**
   * TSX
   */
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">Personal</Link>
      </div>
      <div className="nav-right">
        <ul>
          {navLink.map(({ to, name }, idx) => (
            <Link
              className={`link ${to === activeLink && "active"}`}
              to={to}
              key={`${name}-${idx}`}
            >
              {name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

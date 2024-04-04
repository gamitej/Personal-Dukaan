import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";

const navLink = [
  { to: "/", name: "Overview" },
  { to: "/expenses", name: "Expenses" },
  { to: "/purchase", name: "Purchase" },
  { to: "/payments", name: "Payments" },
  { to: "/sales", name: "Sales" },
  { to: "/stocks", name: "Stocks" },
];

const Navbar = () => {
  const { pathname: activeLink } = useLocation();

  /**
   * TSX
   */
  return (
    <div className="bg-white flex items-center mt-8 border-t border-b h-[4rem] shadow-sm">
      <div className="w-full flex justify-between items-center px-[3rem]">
        <div className="text-primaryBlue font-semibold text-xl">
          <Link to="/">DUKAAN</Link>
        </div>
        <div className="">
          <ul className="flex justify-center items-center gap-6">
            {navLink.map(({ to, name }, idx) => (
              <Link
                className={`font-[400] hover:text-primaryBlue text-lg ${
                  to === activeLink ? "text-primaryBlue" : ""
                }`}
                to={to}
                key={`${name}-${idx}`}
              >
                {name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

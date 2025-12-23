import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = "px-3 py-2 rounded hover:bg-blue-100";

  const activeClass = "bg-blue-600 text-white";

  return (
    <nav className="bg-white border-b mb-6">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-semibold">Desk Booking</div>

        <div className="flex gap-2">
          <NavLink
            to="/desks"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Shared Desks
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

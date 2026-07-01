import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Hexar CMS</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/banner">
            Banner
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/about">
            About Hexar Family
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/mission-vision">
            Mission
          </Link>
        </li>
         <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/vision">
           Vision
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">

          <div className="row">

            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h4>Banner</h4>
                  <p>Manage homepage banner</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h4>About</h4>
                  <p>Manage About Section</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h4>Mission & Vision</h4>
                  <p>Manage Mission & Vision</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
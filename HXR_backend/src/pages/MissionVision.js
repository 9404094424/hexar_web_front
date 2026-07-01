import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Mission() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  const [missionData, setMissionData] = useState({
    missionTitle: "",
    missionDescription: "",
    missionImage: null,
  });

  useEffect(() => {
    fetchMissions();
  }, []);


  const fetchMissions = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_PATH + "/api/mission"
      );

      setMissions(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setMissionData({
      ...missionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setMissionData({
      ...missionData,
      missionImage: e.target.files[0],
    });
  };


  const saveMission = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "missionTitle",
        missionData.missionTitle
      );

      formData.append(
        "missionDescription",
        missionData.missionDescription
      );

      if (missionData.missionImage) {
        formData.append(
          "missionImage",
          missionData.missionImage
        );
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
          "Content-Type":
            "multipart/form-data",
        },
      };

      if (editId) {
        await axios.put(
          process.env.REACT_APP_API_PATH + `/api/mission/${editId}`,
          formData,
          config
        );

        alert("Mission updated successfully");
      } else {
        await axios.post(
          process.env.REACT_APP_API_PATH + "/api/mission",
          formData,
          config
        );

        alert("Mission created successfully");
      }

      fetchMissions();

      setMissionData({
        missionTitle: "",
        missionDescription: "",
        missionImage: null,
      });

      setEditId(null);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };


  const editMission = (mission) => {
    setMissionData({
      missionTitle:
        mission.missionTitle,
      missionDescription:
        mission.missionDescription,
      missionImage: null,
    });

    setEditId(mission._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const deleteMission = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_PATH + `/api/mission/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      alert(
        "Mission deleted successfully"
      );

      fetchMissions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar />

        <div className="container py-4">

          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                Mission Management
              </h4>
            </div>

            <div className="card-body">

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Mission Title"
                name="missionTitle"
                value={
                  missionData.missionTitle
                }
                onChange={handleChange}
              />

              <textarea
                rows="5"
                className="form-control mb-3"
                placeholder="Mission Description"
                name="missionDescription"
                value={
                  missionData.missionDescription
                }
                onChange={handleChange}
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={handleImage}
              />

              <button
                className={`btn ${
                  editId
                    ? "btn-warning"
                    : "btn-success"
                }`}
                onClick={saveMission}
                disabled={loading}
              >
                {loading
                  ? "Please Wait..."
                  : editId
                  ? "Update Mission"
                  : "Save Mission"}
              </button>

              {editId && (
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditId(null);

                    setMissionData({
                      missionTitle: "",
                      missionDescription:
                        "",
                      missionImage: null,
                    });
                  }}
                >
                  Cancel
                </button>
              )}

              <hr />

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th width="180">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {missions.length > 0 ? (
                    missions.map(
                      (mission) => (
                        <tr
                          key={
                            mission._id
                          }
                        >
                          <td>
                            {mission.missionImage && (
                              <img
                                src={process.env.REACT_APP_API_PATH +`/uploads/${mission.missionImage}`}
                                width="100"
                                alt=""
                                className="rounded"
                              />
                            )}
                          </td>

                          <td>
                            {
                              mission.missionTitle
                            }
                          </td>

                          <td>
                            {
                              mission.missionDescription
                            }
                          </td>

                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editMission(
                                  mission
                                )
                              }
                            >
                              Update
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteMission(
                                  mission._id
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center"
                      >
                        No Mission Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Mission;
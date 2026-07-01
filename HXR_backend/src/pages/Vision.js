import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Vision() {
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [visionData, setVisionData] = useState({
    visionTitle: "",
    visionDescription: "",
    visionImage: null,
  });

  useEffect(() => {
    fetchVisions();
  }, []);


  const fetchVisions = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_PATH + "/api/vision"
      );

      setVisions(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setVisionData({
      ...visionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setVisionData({
      ...visionData,
      visionImage: e.target.files[0],
    });
  };


  const saveVision = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "visionTitle",
        visionData.visionTitle
      );

      formData.append(
        "visionDescription",
        visionData.visionDescription
      );

      if (visionData.visionImage) {
        formData.append(
          "visionImage",
          visionData.visionImage
        );
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editId) {
        await axios.put(
          process.env.REACT_APP_API_PATH+`/api/vision/${editId}`,
          formData,
          config
        );

        alert("Vision updated successfully");
      } else {
        await axios.post(
          process.env.REACT_APP_API_PATH +"/api/vision",
          formData,
          config
        );

        alert("Vision created successfully");
      }

      setEditId(null);

      setVisionData({
        visionTitle: "",
        visionDescription: "",
        visionImage: null,
      });

      fetchVisions();
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


  const deleteVision = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_PATH + `/api/vision/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      alert("Vision deleted successfully");

      fetchVisions();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= EDIT =================

  const editVision = (vision) => {
    setEditId(vision._id);

    setVisionData({
      visionTitle: vision.visionTitle,
      visionDescription:
        vision.visionDescription,
      visionImage: null,
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar />

        <div className="container py-4">
          <div className="card shadow">

            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                Vision Management
              </h4>
            </div>

            <div className="card-body">

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Vision Title"
                name="visionTitle"
                value={visionData.visionTitle}
                onChange={handleChange}
              />

              <textarea
                rows="5"
                className="form-control mb-3"
                placeholder="Vision Description"
                name="visionDescription"
                value={visionData.visionDescription}
                onChange={handleChange}
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={handleImage}
              />

              <button
                className="btn btn-success"
                onClick={saveVision}
                disabled={loading}
              >
                {editId
                  ? "Update Vision"
                  : "Save Vision"}
              </button>

              {editId && (
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditId(null);

                    setVisionData({
                      visionTitle: "",
                      visionDescription: "",
                      visionImage: null,
                    });
                  }}
                >
                  Cancel
                </button>
              )}

              <hr />

              <table className="table table-bordered align-middle">

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
                  {visions.map((vision) => (
                    <tr key={vision._id}>
                      <td>
                        {vision.visionImage && (
                          <img
                            src={process.env.REACT_APP_API_PATH + `/uploads/${vision.visionImage}`}
                            width="100"
                            className="rounded"
                            alt=""
                          />
                        )}
                      </td>

                      <td>
                        {vision.visionTitle}
                      </td>

                      <td>
                        {vision.visionDescription}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            editVision(
                              vision
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteVision(
                              vision._id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {visions.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center"
                      >
                        No Vision Data Found
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

export default Vision;
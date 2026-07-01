import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function About() {
  const [abouts, setAbouts] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbouts();
  }, []);

  const fetchAbouts = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_PATH + "/api/about"
      );

      setAbouts(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      setPreviewImage(
        URL.createObjectURL(file)
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null,
    });

    setPreviewImage("");
    setEditingId(null);

    const fileInput =
      document.getElementById("aboutImage");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      const config = {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem(
              "token"
            )}`,
        },
      };

      if (editingId) {
        await axios.put(
          process.env.REACT_APP_API_PATH+`/api/about/${editingId}`,
          data,
          config
        );

        alert(
          "About updated successfully"
        );
      } else {
        await axios.post(
          process.env.REACT_APP_API_PATH + "/api/about",
          data,
          config
        );

        alert(
          "About created successfully"
        );
      }

      fetchAbouts();
      resetForm();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const editAbout = (about) => {
    setEditingId(about._id);

    setFormData({
      title: about.title,
      description:
        about.description,
      image: null,
    });

    setPreviewImage(
      process.env.REACT_APP_API_PATH+`/uploads/${about.image}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteAbout = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_PATH+`/api/about/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );

      alert(
        "About deleted successfully"
      );

      fetchAbouts();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar />

        <div className="container py-4">

          {/* Form */}

          <div className="card shadow border-0 mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                About Management
              </h4>
            </div>

            <div className="card-body">
              <form
                onSubmit={handleSubmit}
              >

                <div className="mb-3">
                  <label className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={
                      formData.title
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    className="form-control"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Image
                  </label>

                  <input
                    id="aboutImage"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={
                      handleFileChange
                    }
                  />
                </div>

                {previewImage && (
                  <div className="mb-3">
                    <img
                      src={
                        previewImage
                      }
                      alt=""
                      width="150"
                      className="rounded border"
                    />
                  </div>
                )}

                <button
                  className="btn btn-success"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update About"
                    : "Add About"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={
                      resetForm
                    }
                  >
                    Cancel
                  </button>
                )}

              </form>
            </div>
          </div>

          {/* Table */}

          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white">
              About List
            </div>

            <div className="card-body">
              <div className="table-responsive">

                <table className="table table-bordered">

                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {abouts.map(
                      (about) => (
                        <tr
                          key={
                            about._id
                          }
                        >
                          <td>
                            <img
                              src={process.env.REACT_APP_API_PATH+`/uploads/${about.image}`}
                              width="100"
                              alt=""
                            />
                          </td>

                          <td>
                            {
                              about.title
                            }
                          </td>

                          <td>
                            {
                              about.description
                            }
                          </td>

                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editAbout(
                                  about
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteAbout(
                                  about._id
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
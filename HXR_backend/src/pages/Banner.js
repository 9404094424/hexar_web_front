import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Banner() {
  const [banners, setBanners] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: null,
    imagePreview: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_PATH+"/api/banner"
      );

      setBanners(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
      imagePreview: URL.createObjectURL(file)
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image: null,
      imagePreview: ""
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };

      if (editingId) {
        await axios.put(
          process.env.REACT_APP_API_PATH+`/api/banner/${editingId}`,
          data,
          config
        );

        alert("Banner updated successfully");
      } else {
        await axios.post(
         process.env.REACT_APP_API_PATH + "/api/banner",
          data,
          config
        );

        alert("Banner created successfully");
      }

      resetForm();
      fetchBanners();

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

  const editBanner = (banner) => {
    setEditingId(banner._id);

    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: null,
      imagePreview: banner.image
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteBanner = async (id) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this banner?"
    // );

    // if (!confirmDelete) return;

    try {
        // console.log(`http://localhost:5000/api/banner/${id}`);
        
      await axios.delete(
        process.env.REACT_APP_API_PATH +`/api/banner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Banner deleted successfully");

      fetchBanners();

      if (editingId === id) {
        resetForm();
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar />

        <div className="container py-4">

          {/* FORM SECTION */}

          <div className="card shadow border-0 mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                {editingId
                  ? "Update Banner"
                  : "Create Banner"}
              </h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* TITLE */}

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Banner Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Banner Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SUBTITLE */}

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Banner Subtitle
                  </label>

                  <textarea
                    rows="4"
                    name="subtitle"
                    className="form-control"
                    placeholder="Enter Banner Subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* IMAGE */}

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Banner Image
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* IMAGE PREVIEW */}

                {formData.imagePreview && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Image Preview
                    </label>

                    <div>
                      <img
                        src={
                          editingId && !formData.image
                            ? process.env.REACT_APP_API_PATH+`/uploads/${formData.imagePreview}`
                            : formData.imagePreview
                        }
                        alt="Preview"
                        className="img-thumbnail"
                        style={{
                          width: "250px",
                          height: "150px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* BUTTONS */}

                <div className="d-flex gap-2 flex-wrap">

                  <button
                    type="submit"
                    className={`btn ${
                      editingId
                        ? "btn-primary"
                        : "btn-success"
                    }`}
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editingId
                      ? "Update Banner"
                      : "Add Banner"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Clear
                  </button>

                </div>

              </form>
            </div>
          </div>

          {/* TABLE SECTION */}

          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                Banner List
              </h5>
            </div>

            <div className="card-body">
              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th width="180">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {banners.length > 0 ? (
                      banners.map((banner) => (
                        <tr key={banner._id}>

                          <td>
                            <img
                              src={process.env.REACT_APP_API_PATH+`/uploads/${banner.image}`}
                              alt={banner.title}
                              className="rounded"
                              style={{
                                width: "120px",
                                height: "70px",
                                objectFit: "cover"
                              }}
                            />
                          </td>

                          <td>{banner.title}</td>

                          <td>{banner.subtitle}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editBanner(banner)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteBanner(banner._id)
                              }
                            >
                              Delete
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-4"
                        >
                          No Banner Found
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
    </div>
  );
}

export default Banner;
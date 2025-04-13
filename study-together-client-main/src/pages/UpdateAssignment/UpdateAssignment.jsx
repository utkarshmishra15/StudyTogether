import { Helmet } from "react-helmet";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateAssignment = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date(loaderData.date));
  const navigate = useNavigate();

  // handle create assignment
  const handleUpdateAssignment = (e) => {
    e.preventDefault();

    const form = e.target;

    const assignmentTitle = form.assignment_title.value;
    const description = form.description.value;
    const thumbnailURL = form.thumbnail_url.value;
    const marks = form.marks.value;
    const difficultyLevel = form.difficultyLevel.value;
    const date = startDate;

    const assignmentInfo = {
      assignmentTitle,
      description,
      thumbnailURL,
      marks,
      difficultyLevel,
      date,
      author: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    // data sending to server
    axios
      .patch(
        `https://online-study-server-iota.vercel.app

/assignment/${loaderData._id}`,
        assignmentInfo
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.modifiedCount) {
          toast.success("Successfully Updated");
          navigate("/assignments");
        } else {
          toast.error("nothing change");
        }
      })
      .catch((error) => {
        console.log(error?.message);
        toast.error("something wrong....!");
      });
  };

  return (
    <div className="container  mx-auto">
      <Helmet>
        <title>STUDY TOGETHER | Update Assignment</title>
      </Helmet>

      {/* start */}
      <div className="bg-base-200 lg:p-24 md:p-16 p-10">
        <h2 className="text-5xl text-center font-bold mb-6">
          Update Assignment
        </h2>
        <form onSubmit={handleUpdateAssignment}>
          {/* Assignment title row */}
          <div className=" mb-4">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Assignment Title</span>
              </label>
              <label className="input-group">
                <input
                  required
                  type="text"
                  name="assignment_title"
                  placeholder="Assignment Title"
                  className="input input-bordered w-full"
                  defaultValue={loaderData.assignmentTitle}
                />
              </label>
            </div>
          </div>

          {/* Description row */}
          <div className="mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
                <textarea
                  required
                  className="textarea textarea-bordered w-full"
                  name="description"
                  rows="2"
                  placeholder="Description"
                  defaultValue={loaderData.description}
                ></textarea>
              </label>
            </div>
          </div>

          {/* Thumbnail url row */}
          <div className=" mb-4">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <label className="input-group">
                <input
                  required
                  type="text"
                  name="thumbnail_url"
                  placeholder="Thumbnail URL"
                  className="input input-bordered w-full"
                  defaultValue={loaderData.thumbnailURL}
                />
              </label>
            </div>
          </div>

          {/* form  row */}
          <div className="lg:flex mb-4 gap-4">
            {/* mark */}
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className="label-text">Marks</span>
              </label>
              <label className="input-group">
                <input
                  required
                  type="text"
                  name="marks"
                  placeholder="Marks"
                  className="input input-bordered w-full"
                  defaultValue={loaderData.marks}
                />
              </label>
            </div>

            {/* date */}
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="input-group w-full">
                <DatePicker
                  className="input input-bordered w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </label>
            </div>

            {/* assignment difficulty level */}
            <div className="form-control lg:w-1/2 w-full ">
              <label className="label">
                <span className="label-text">Assignment Difficulty Level</span>
              </label>
              <label className="input-group">
                <select
                  required
                  className="select select-bordered w-full "
                  name="difficultyLevel"
                  defaultValue={loaderData.difficultyLevel}
                >
                  <option disabled selected>
                    Select Difficulty Level
                  </option>
                  <option defaultValue="Hard">Hard</option>
                  <option defaultValue="Medium">Medium</option>
                  <option defaultValue="Easy">Easy</option>
                </select>
              </label>
            </div>
          </div>

          {/* form userEmail and userName row */}
          <div className="md:flex mb-8 gap-4">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <label className="input-group">
                <input
                  disabled
                  defaultValue={user?.email}
                  type="text"
                  name="userEmail"
                  placeholder="User Email"
                  className="input disabled:border-1 disabled:border-gray-300 input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control md:w-1/2 ">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <label className="input-group">
                <input
                  disabled
                  defaultValue={user?.displayName}
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  className="input disabled:border-1 disabled:border-gray-300 input-bordered w-full "
                />
              </label>
            </div>
          </div>

          <input
            type="submit"
            value="Update Assignment"
            className="btn btn-block bg-[#e35353] text-white hover:bg-[#e35353]"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;

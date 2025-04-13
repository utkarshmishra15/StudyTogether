import { Helmet } from "react-helmet";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Fade } from "react-awesome-reveal";

const CreateAssignment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  // handle create assignment
  const handleCreateAssignment = ({
    assignment_title,
    description,
    thumbnail_url,
    marks,
    difficultyLevel,
  }) => {
    const date = startDate;

    const assignmentInfo = {
      assignmentTitle: assignment_title,
      description: description,
      thumbnailURL: thumbnail_url,
      marks: marks,
      difficultyLevel: difficultyLevel,
      date,
      author: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    // data sending to server
    axios
      .post(
        "https://online-study-server-iota.vercel.app/assignment",
        assignmentInfo
      )
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Successfully Assignment Created");
          navigate("/assignments");
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
        <title>STUDY TOGETHER | Create Assignment</title>
      </Helmet>

      {/* start */}
      <Fade duration={1500}>
        <div className="bg-base-200 lg:p-24 md:p-16 p-10">
          <h2 className="text-5xl text-center font-bold mb-6">
            Create a New Assignment
          </h2>
          <form onSubmit={handleSubmit(handleCreateAssignment)}>
            {/* Assignment title row */}
            <div className=" mb-4">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Assignment Title</span>
                </label>
                <label className="input-group">
                  <input
                    {...register("assignment_title", { required: true })}
                    type="text"
                    placeholder="Assignment Title"
                    className="input input-bordered w-full"
                  />
                  {errors.assignment_title && (
                    <p className="text-sm text-red-600">
                      Assignment Title is required.
                    </p>
                  )}
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
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered w-full"
                    rows="2"
                    placeholder="Description"
                  ></textarea>{" "}
                  {errors.description && (
                    <p className="text-sm text-red-600">
                      Description is required.
                    </p>
                  )}
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
                    {...register("thumbnail_url", { required: true })}
                    type="text"
                    placeholder="Thumbnail URL"
                    className="input input-bordered w-full"
                  />{" "}
                  {errors.thumbnail_url && (
                    <p className="text-sm text-red-600">
                      Thumbnail URL is required.
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* form  row */}
            <div className="lg:flex mb-4 gap-4">
              {/* mark */}
              <div className="form-control lg:w-1/3 w-full">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <label className="input-group">
                  <input
                    {...register("marks", { required: true })}
                    type="text"
                    placeholder="Marks"
                    className="input input-bordered w-full"
                  />{" "}
                  {errors.marks && (
                    <p className="text-sm text-red-600">Marks is required.</p>
                  )}
                </label>
              </div>

              {/* date */}
              <div className="form-control lg:w-1/3  w-full">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>

                <DatePicker
                  className="input input-bordered block w-full "
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              {/* assignment difficulty level */}
              <div className="form-control lg:w-1/3 w-full ">
                <label className="label">
                  <span className="label-text">
                    Assignment Difficulty Level
                  </span>
                </label>
                <label className="input-group">
                  <select
                    {...register("difficultyLevel", { required: true })}
                    className="select select-bordered w-full "
                  >
                    <option disabled selected>
                      Select Difficulty Level
                    </option>
                    <option defaultValue="Hard">Hard</option>
                    <option defaultValue="Medium">Medium</option>
                    <option defaultValue="Easy">Easy</option>
                  </select>
                  {errors.difficultyLevel && (
                    <p className="text-sm text-red-600">
                      Select difficulty Level
                    </p>
                  )}
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
              value="Publish Assignment"
              className="btn btn-block bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)] text-white hover:bg-[#e35353]"
            />
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default CreateAssignment;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Card = ({ assignment, setAssignments, assignments }) => {
  const { user } = useAuth();

  // delete method
  const handleDelete = (id) => {
    if (user.email !== assignment?.author?.email) {
      return Swal.fire({
        icon: "warning",
        title: "You are not the author of this assignment.",
      });
    }

    // sweet alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // axios delete
        axios
          .delete(
            `https://online-study-server-iota.vercel.app

/assignment/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount) {
              const reamining = assignments.filter(
                (assignment) => assignment._id !== id
              );
              setAssignments(reamining);
            }
          })
          .catch((error) => {
            console.log(error.message);
            toast.error("something is wrong");
          });

        // sweet alert
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section>
      <div className="card realNest-card rounded-none bg-base-200 hover:shadow-xl duration-300 cursor-pointer">
        <figure className=" ">
          <div className="  w-full md:h-[280px] flex justify-center items-center  ">
            <img
              src={assignment?.thumbnailURL}
              alt="Shoes"
              className="w-full h-full object-cover"
            />
          </div>
        </figure>
        <div className="card-body p-6 space-y-4  font-[500] ">
          <div className="flex justify-between items-center">
            <span
              className="border-2 border-gray-300 px-3 py-2 rounded 
           text-sm"
            >
              <span className="font-bold text-xl ">
                {assignment?.difficultyLevel}
              </span>
            </span>
            <span className="  ">
              Marks:{" "}
              <span className="font-bold text-3xl">{assignment?.marks}</span>
            </span>
          </div>

          <h2 className=" text-xl font-bold  ">
            {assignment?.assignmentTitle}
          </h2>

          <hr className="border border-dashed my-2 mt-2" />

          <div className="flex justify-between items-center font-[500]">
            <div className="flex items-center gap-1">
              <Link to={`/view_assignment/${assignment._id}`}>
                <button className="btn btn-md text-[#E35353] hover:text-white duration-300 hover:border-[#E35353] border-1  rounded-sm border-[#E35353] bg-transparent  hover:bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)]  ">
                  View Assignment
                </button>
              </Link>
            </div>
            {user && (
              <div className=" space-x-3">
                <Link to={`/updateAssignment/${assignment._id}`}>
                  <button className="btn btn-md text-white   bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)]   rounded-sm  hover:bg-[#E35353] border-none  ">
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="btn btn-md text-white   bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)]   rounded-sm  hover:bg-[#E35353] border-none  "
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;

Card.propTypes = {
  assignment: PropTypes.object,
};
Card.propTypes = {
  setAssignments: PropTypes.func,
};
Card.propTypes = {
  assignments: PropTypes.array,
};

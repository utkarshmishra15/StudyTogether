import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

const ViewAssignment = () => {
  const loaderData = useLoaderData();
  const { marks, assignmentTitle } = loaderData;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleModal = (e) => {
    e.preventDefault();
    //
    const form = e.target;

    const pdfLink = form.pdf_link.value;
    const note = form.note.value;

    const dataInfo = {
      assignmentTitle,
      pdfLink,
      note,
      marks,
      obtainMark: "none",
      status: "Pending",
      feedback: "none",
      examineeInfo: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    axios
      .post("https://online-study-server-iota.vercel.app/answer", dataInfo)
      .then((res) => {
        console.log(res.data);
        toast.success("Successfully Submitted");
        navigate(`/my_submitted_assignment`);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("something is wrong");
      });
  };

  return (
    <section>
      {/* modal give mark */}

      <Fade duration={1500}>
        <dialog id="my_modal_2" className="At nulla temporibus modal ">
          <div className="At nulla temporibus modal-box">
            <div className="text-center">
              <div className="my-2">
                <div className="">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user?.photoURL} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.displayName}</div>
                    <div className="text-sm opacity-50">Examinee</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleModal}>
                <div className=" mb-4">
                  {/* marks */}
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">PDF doc Link</span>
                    </label>
                    <label className="input-group">
                      <input
                        required
                        type="text"
                        name="pdf_link"
                        placeholder="PDF doc Link"
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>
                </div>

                {/* feedback */}
                <div className="mb-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Note</span>
                    </label>
                    <label className="input-group">
                      <textarea
                        required
                        className="textarea textarea-bordered w-full"
                        name="note"
                        rows="2"
                        placeholder="..."
                      ></textarea>
                    </label>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-block bg-[#e35353] text-white hover:bg-[#e35353]"
                />
              </form>
            </div>
          </div>
          <form method="dialog" className="At nulla temporibus modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Fade>

      <Fade duration={1500}>
        <div className="At flex flex-col mt-10 lg:flex-row   card lg:At   card-side bg-base-100 shadow-xl container lg:w-[1200px] mx-auto">
          <figure className="lg:w-5/12  rounded-tr-2xl rounded-bl-none lg:rounded-tr-none">
            <img
              className="object-fill h-full rounded-bl-2xl"
              src={loaderData?.thumbnailURL}
              alt="Album"
            />
          </figure>
          <div className="At  card-body lg:w-7/12">
            {/* author info */}

            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={loaderData?.author?.photo}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold"> {loaderData?.author?.name}</div>
                <div className="text-sm opacity-50">Author</div>
              </div>
            </div>
            {/* date */}
            <p>
              <span className="font-bold">Date:</span>{" "}
              <span>{new Date(loaderData?.date).toLocaleDateString()}</span>
            </p>

            <div className="flex justify-between items-center">
              <h2 className="At card-title text-4xl font-bold">
                {loaderData?.assignmentTitle}
              </h2>
              <button className="btn font-bold text-2xl">
                {loaderData?.difficultyLevel}
              </button>
            </div>
            <p>
              <span className="font-bold">Description: </span>
              {loaderData?.description}
            </p>
            <h3>
              <span className="font-bold">Marks: </span>
              <span className="text-5xl font-bold">{loaderData?.marks}</span>
            </h3>

            <div className="At  card-actions justify-end">
              {loaderData?.author.email !== user?.email ? (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="At  btn At  bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)] text-white "
                >
                  Take Assignment
                </button>
              ) : (
                <button
                  disabled={true}
                  className="At  btn At  bg-error text-white disabled:cursor-not-allowed"
                >
                  Take Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default ViewAssignment;

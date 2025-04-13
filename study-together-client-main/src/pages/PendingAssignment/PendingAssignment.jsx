import { Helmet } from "react-helmet";
import { VscFilePdf } from "react-icons/vsc";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import DataLoading from "../../img/loading.json";

const PendingAssignment = () => {
  const loaderData = useLoaderData();
  const [modalData, setModalData] = useState({});
  const { user } = useAuth();
  const [pendingDatas, setPendingDatas] = useState([]);
  const [modifiedCount, setModifiedCount] = useState(0);
  const [loadingPending, setLoadingPending] = useState(true);

  useEffect(() => {
    axios("https://online-study-server-iota.vercel.app/answers", {
      withCredentials: true,
    }).then((res) => {
      setLoadingPending(true);
      setPendingDatas(res.data);
      setLoadingPending(false);
    });
  }, [modifiedCount]);

  const newPendingData = pendingDatas.filter(
    (data) => data.obtainMark === "none" || data.feedback === "none"
  );

  const handleGiveMark = (id) => {
    const data = loaderData?.data?.find((data) => data._id === id);

    setModalData(data);

    // handle submit
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const obtainMark = form.obtainMarks.value;
    const feedback = form.feedback.value;

    const dataInfo = {
      obtainMark,
      feedback,
      status: "Completed",
    };

    axios
      .patch(
        `https://online-study-server-iota.vercel.app/feedback/${modalData._id}`,
        dataInfo
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          setModifiedCount(res.data.modifiedCount);
          form.reset();
          toast.success("Successfully Submitted");
        } else {
          toast.error(
            "something is wrong modifiedCount",
            res.data.modifiedCount
          );
        }
      })
      .catch(() => {
        toast.error("something is wrong");
      });
  };

  if (loadingPending)
    return (
      <div className="flex justify-center items-center min-h-[60vh] ">
        <Lottie className="w-32 " animationData={DataLoading} loop={true} />
      </div>
    );

  return (
    <div>
      <Helmet>
        <title>STUDY TOGETHER | Pending Assignmen</title>
      </Helmet>

      {/* modal give mark */}

      <dialog id="my_modal_2" className="At nulla temporibus modal">
        <div className="At nulla temporibus modal-box">
          <div className="text-center">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={modalData?.examineeInfo?.photo}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    {modalData?.examineeInfo?.name}
                  </div>
                  <div className="text-sm opacity-50 flex justify-start">
                    Examinee
                  </div>
                </div>
              </div>
              <a className="" href={modalData?.pdfLink} target="_blank">
                <div className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 ">
                  <span className="px-4 py-3 font-bold flex gap-2">
                    <VscFilePdf className="text-2xl" /> <span>PDF Link</span>
                  </span>
                </div>
              </a>
            </div>

            <form onSubmit={handleSubmit}>
              <div className=" mb-4">
                {/* marks */}
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Marks</span>
                  </label>
                  <label className="input-group">
                    <input
                      required
                      type="text"
                      name="obtainMarks"
                      placeholder="Marks"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>
              </div>

              {/* feedback */}
              <div className="mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Feedback</span>
                  </label>
                  <label className="input-group">
                    <textarea
                      required
                      className="textarea textarea-bordered w-full"
                      name="feedback"
                      rows="2"
                      placeholder="..."
                    ></textarea>
                  </label>
                </div>
              </div>

              <input
                type="submit"
                value="Submit"
                className="btn btn-block bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)] text-white hover:bg-[#e35353]"
              />
            </form>
          </div>
        </div>
        <form method="dialog" className="At nulla temporibus modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <Fade duration={1500}>
        <section className="container px-4 mx-auto pt-12 space-y-6">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium  ">My Submitted Assignments</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              0{newPendingData.length} Assignments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="At nulla temporibus table At nulla temporibus table-zebra border border-base-200">
              {/* head */}
              <thead className="text-[15px]">
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Examinee Name </th>
                  <th>Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {newPendingData.map((data, index) => (
                  <tr key={data._id}>
                    <th>{index + 1}</th>
                    <td>{data.assignmentTitle}</td>
                    <td>{data.examineeInfo.name}</td>
                    <td>{data.marks}</td>
                    <td>
                      <button
                        disabled={data.examineeInfo.email === user.email}
                        onClick={() => [
                          document.getElementById("my_modal_2").showModal(),
                          handleGiveMark(data._id),
                        ]}
                        className="btn btn-sm btn-success text-white disabled:cursor-not-allowed"
                      >
                        Give Mark
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default PendingAssignment;

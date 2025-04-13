import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const MySubmittedAssignment = () => {
  const { user } = useAuth();
  const loaderData = useLoaderData();

  return (
    <section>
      <Helmet>
        <title>STUDY TOGETHER | My Submitted Assignment</title>
      </Helmet>
      <Fade duration={1500}>
        <div className="container px-4 mx-auto pt-12 space-y-6">
          <div className="flex items-center gap-x-3 ">
            <h2 className="text-lg font-medium text-gray-800 ">
              My Submitted Assignments
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              0
              {
                loaderData?.data.filter(
                  (data) => data.examineeInfo.email === user.email
                ).length
              }{" "}
              Assignments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="At nulla temporibus table At nulla temporibus table-zebra border border-base-200">
              {/* head */}
              <thead className="text-[15px]">
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Status </th>
                  <th>Marks</th>
                  <th>Obtain Marks</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {loaderData?.data
                  ?.filter((data) => data?.examineeInfo?.email === user?.email)
                  .map((data, index) => (
                    <tr key={data?._id}>
                      <th>{index + 1}</th>
                      <td>{data?.assignmentTitle}</td>
                      <td>
                        <button
                          className={`btn btn-sm  ${
                            data?.status === "Pending"
                              ? "btn-warning"
                              : "btn-success text-white"
                          }`}
                        >
                          {data.status}
                        </button>
                      </td>
                      <td>{data?.marks}</td>
                      <td>{data?.obtainMark}</td>
                      <td>{data?.feedback}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default MySubmittedAssignment;

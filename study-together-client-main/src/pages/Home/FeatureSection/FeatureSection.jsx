import { Fade } from "react-awesome-reveal";
import HomeCard from "../HomeCard/HomeCard";
import PropTypes from "prop-types";

const FeatureSection = ({ assignments }) => {
  return (
    <div className="space-y-10">
      <Fade duration={1500}>
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold ">All Assignments</h2>
          <p className="mx-auto md:w-3/5">
            Discover and manage all your assignments conveniently in one place.
            Stay organized, meet deadlines, and excel in your academic journey
            with ease.
          </p>
        </div>
      </Fade>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {assignments.map((assignment) => (
          <HomeCard key={assignment._id} assignment={assignment}></HomeCard>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;

FeatureSection.propTypes = {
  assignments: PropTypes.array,
};

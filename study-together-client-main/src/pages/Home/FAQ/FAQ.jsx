// import FAQ_img from "/img/faq.jpg";

const FAQ = () => {
  return (
    <section className="space-y-10">
      {/* text */}
      <div>
        <h2 className="md:text-5xl text-3xl font-bold text-center">
          Questions? Look Here
        </h2>
      </div>

      {/* new FAQ */}
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-4 ">
        <div className="lg:w-3/5 space-y-4">
          <div className="collapse collapse-arrow rounded-none bg-base-200 py-2 ">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How do I join a study group
            </div>
            <div className="collapse-content">
              <p>
                To join a study group, simply sign up for an account on our
                platform and browse through the available groups. Once you find
                one that interests you, click on the Join Group button and you
                will be connected with fellow learners.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none bg-base-200 py-2">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Can I create my own study group?
            </div>
            <div className="collapse-content">
              <p>
                {" "}
                Absolutely! You can create your own study group by navigating to
                the Create Group section on our website. Fill out the necessary
                details such as the groups subject, meeting times, and any
                specific requirements, and invite others to join you in your
                learning journey.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none bg-base-200 py-2">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Are the study sessions conducted online or in person?
            </div>
            <div className="collapse-content">
              <p>
                The majority of our study sessions are conducted online to
                provide convenience and accessibility to our users. However,
                some groups may choose to meet in person depending on their
                preferences and location.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none bg-base-200 py-2">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What if I can not find a study group for my specific subject?
            </div>
            <div className="collapse-content">
              <p>
                {" "}
                If you can not find a study group for your specific subject, you
                can either create your own group or express your interest in a
                particular subject area on our platform. We regularly update our
                offerings based on user feedback and demand.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none bg-base-200 py-2">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Is there a fee to join or create study groups?
            </div>
            <div className="collapse-content">
              <p>
                No, there is no fee to join or create study groups on our
                platform. We believe in fostering a collaborative learning
                community that is accessible to all, regardless of financial
                constraints.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 lg:mb-0 mb-4">
          <img className="object-cover h-full" src="/img/faq.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;

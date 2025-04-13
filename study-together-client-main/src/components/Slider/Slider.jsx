// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <div>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          "--swiper-navigation-color": "#E35353",
          "--swiper-pagination-color": "#E35353",
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className={`slider slider1 flex justify-center items-center z-0 bg-[linear-gradient(45deg,#FF6F6159,#9656A1B3),url('/img/slider1.jpg')] h-[700px] bg-cover bg-center `}
          >
            <div className="text-center text-white space-y-8">
              <h2 className="md:text-5xl text-4xl font-bold  text-white capitalize  mx-auto w-4/5">
                Interactive Study Groups
              </h2>
              <p className="lg:w-2/3 mx-auto w-4/5">
                Engage in dynamic study sessions with interactive discussions,
                group activities, and shared resources. Foster deeper
                understanding and collaboration with fellow learners.
              </p>
              <div className="space-x-4">
                <button className="btn btn-lg border-[3px] font-bold bg-white hover:border-white text-[#FF6F61]  border-white hover:bg-transparent hover:text-white">
                  Study Together Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slider slider1 flex justify-center items-center z-0 bg-[linear-gradient(45deg,#FF6F6159,#9656A1B3),url('/img/slider2.jpg')] h-[700px] bg-cover bg-center ">
            <div className="text-center text-white space-y-8">
              <h2 className="md:text-5xl text-4xl font-bold text-white capitalize mx-auto w-4/5">
                Resource Sharing Community
              </h2>
              <p className="lg:w-2/3 mx-auto w-4/5">
                Join a vibrant community of learners dedicated to sharing
                knowledge and resources. Access study materials, notes, and
                insights contributed by group members, enriching your learning
                journey.
              </p>
              <div className="space-x-4">
                <button className="btn btn-lg border-[3px] font-bold bg-white hover:border-white text-[#FF6F61]  border-white hover:bg-transparent hover:text-white">
                  Study Together Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slider slider1 flex justify-center items-center z-0 bg-[linear-gradient(45deg,#FF6F6159,#9656A1B3),url('/img/slider3.jpg')] h-[700px] bg-cover bg-center ">
            <div className="text-center text-white space-y-8">
              <h2 className="md:text-5xl text-4xl font-bold text-white capitalize mx-auto w-4/5">
                Virtual Study Rooms
              </h2>
              <p className="lg:w-2/3 mx-auto w-4/5">
                Immerse yourself in virtual study environments designed for
                collaborative learning. Connect with peers in real-time, engage
                in group discussions, and stay focused with dedicated study
                spaces.
              </p>
              <div className="space-x-4">
                <button className="btn btn-lg border-[3px] font-bold hover:bg-white hover:border-white hover:text-[#FF6F61]  border-white bg-transparent text-white">
                  Study Together Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slider slider1 flex justify-center items-center z-0 bg-[linear-gradient(45deg,#FF6F6159,#9656A1B3),url('/img/slider4.jpg')] h-[700px] bg-cover bg-center ">
            <div className="text-center text-white space-y-8">
              <h2 className="md:text-5xl text-4xl font-bold text-white capitalize mx-auto w-4/5">
                Flexible Study Scheduling
              </h2>
              <p className="lg:w-2/3 mx-auto w-4/5">
                Customize your study routine with flexible scheduling options.
                Find study groups that align with your availability and academic
                goals, ensuring a convenient and productive learning experience.
              </p>
              <div className="space-x-4">
                <button className="btn btn-lg border-[3px] font-bold bg-white hover:border-white text-[#FF6F61]  border-white hover:bg-transparent hover:text-white">
                  Study Together Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;

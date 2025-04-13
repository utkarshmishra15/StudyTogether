const CardExprement = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto ">
      <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md bg-[url('/img/slider2.jpg')]"></div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-80 bg-[linear-gradient(45deg,#FF6F61,#9656A1)]">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          Nike Revolt
        </h3>

        <div className="flex items-center text-white justify-between px-3 py-2 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
          voluptas.
        </div>

        <div className="flex items-center justify-between px-3 py-2 ">
          <button className="btn btn-sm btn-">Delete</button>
          <button className="btn btn-sm">Update</button>
          <button className="btn btn-sm">View Assignment</button>
        </div>
      </div>
    </div>
  );
};

export default CardExprement;

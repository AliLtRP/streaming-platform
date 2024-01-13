import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../../components/UploadModal";
import { Button } from "flowbite-react";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex w-full justify-center mt-10 relative">
        <div className="flex flex-col sm:flex-row w-[90%] max-w-[600px] p-2 cursor-pointer rounded ring-2 ring-gray-300 shadow">
          <div className="flex items-center justify-center aspect-video md:w-[500px]  sm:mr-4 bg-gray-500 rounded">
            <FontAwesomeIcon className="w-10 h-10 text-gray-50" icon={faPlay} />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl  font-bold">Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus doloribus laboriosam, porro esse, officiis et
            </p>
          </div>
        </div>
      </div>
      <button className="fixed bottom-[5%] right-[5%] bg-blue-500 p-3 rounded-xl text-white text-md cursor-pointer active:scale-[98%] duration-150 capitalize">
        upload video
      </button>
      <Button>test</Button>
      <UploadModal />
    </div>
  );
};

export default Home;

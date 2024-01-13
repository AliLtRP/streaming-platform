import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../../components/UploadModal";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import useHTTP from "../../hooks/useHTTP";
import { useNavigate } from "react-router-dom";
import useVideosStore from "../../store/Videos";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [sendHTTP, response] = useHTTP();
  const navigate = useNavigate();
  const { setVideos } = useVideosStore();
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await sendHTTP("/user/videos/", "GET");
    if (res?.data) {
      setVideos(response?.data);
    }
    return res;
  };

  console.log("data", response);
  return (
    <div className="flex">
      <div className="flex w-full justify-center mt-10 relative">
        {response?.data?.length > 0
          ? response?.data?.map((video, index) => {
              return (
                <div
                  onClick={() => navigate(`/party/${video._id}`)}
                  className="flex flex-col sm:flex-row w-[90%] max-w-[600px] p-2 cursor-pointer rounded ring-2 ring-gray-300 shadow"
                >
                  <div className="flex items-center justify-center aspect-video md:w-[500px]  sm:mr-4 bg-gray-500 rounded">
                    <FontAwesomeIcon
                      className="w-10 h-10 text-gray-50"
                      icon={faPlay}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl  font-bold">Title</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Necessitatibus doloribus laboriosam, porro esse, officiis
                      et
                    </p>
                  </div>
                </div>
              );
            })
          : response?.loading
          ? "Loading..."
          : "No videos"}
      </div>

      <Button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-[5%]  right-[5%] p-1 rounded-xl text-white cursor-pointer active:scale-[98%] duration-150 capitalize"
      >
        upload video
      </Button>

      <UploadModal
        refresh={fetchVideos}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Home;

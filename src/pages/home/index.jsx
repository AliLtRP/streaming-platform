import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../../components/UploadModal";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import useHTTP from "../../hooks/useHTTP";
import { useNavigate } from "react-router-dom";
import useVideosStore from "../../store/Videos";
import DeleteModal from "../../components/DeleteModal";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [sendHTTP, response] = useHTTP();
  const navigate = useNavigate();
  const { setVideos } = useVideosStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await sendHTTP("/user/videos/", "GET");
    console.log("res", res);
    if (res?.data) {
      setVideos(res.data);
    }
    return res;
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center w-full justify-center mt-10 relative">
        {response?.data?.length > 0
          ? response?.data?.map((video, index) => {
              return (
                <div
                  key={index}
                  onClick={() => navigate(`/party/${video._id}`)}
                  className="flex flex-col sm:flex-row w-[90%] max-w-[600px] p-2 mt-5 cursor-pointer rounded ring-2 ring-gray-300 shadow"
                >
                  <div className="flex items-center justify-center aspect-video md:w-[500px] md:max-w-[40%]  sm:mr-4 bg-gray-500 rounded">
                    <FontAwesomeIcon
                      className="w-10 h-10 text-gray-50"
                      icon={faPlay}
                    />
                  </div>
                  <div className="flex flex-1 flex-col mt-4">
                    <h3 className="text-2xl  font-bold">{video?.title}</h3>
                    <p>{video?.description}</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(video._id);
                        setOpenDeleteModal(true);
                      }}
                      className="flex items-center justify-center self-end w-8 h-8 mt-auto aspect-video sm:mr-4 bg-red-500 rounded"
                    >
                      <FontAwesomeIcon
                        className=" text-gray-50"
                        icon={faTrash}
                      />
                    </div>
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

      <DeleteModal
        refresh={fetchVideos}
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        id={deleteId}
      />
    </div>
  );
};

export default Home;

import { useParams } from "react-router-dom";
import useHTTP from "../../hooks/useHTTP";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";
import Chat from "../../components/Chat";

const Party = () => {
  const params = useParams();
  const [sendHTTP, video] = useHTTP();

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-1 flex-col h-full px-20 py-10  justify-center items-center">
        <video
          src={`http://192.168.4.16:8080/stream/video/${params.party_id}`}
          controls
          type="video/mp4"
          className="flex-1 items-center justify-center  h-[50%] w-[88%] sm:mr-4 bg-gray-500 rounded"
        ></video>
        <div className="text-start self-start">
          <h3 className="text-2xl font-bold mt-4">Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus doloribus laboriosam, porro esse, officiis et
          </p>
        </div>
        <Button className="self-end justify-self-end">Share</Button>
      </div>
      <Chat />
    </div>
  );
};

export default Party;

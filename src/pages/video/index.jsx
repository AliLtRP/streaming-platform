import { useParams } from "react-router-dom";
import useHTTP from "../../hooks/useHTTP";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";

const Video = () => {
  const params = useParams();
  const [sendHTTP, response] = useHTTP();

  useEffect(() => {
    sendHTTP({
      url: `/videos/${params.video_id}`,
      method: "GET",
    });
  }, []);

  return (
    <div className="flex p-5 w-fit  mx-auto flex-col min-h-screen justify-center items-center">
      <div className="flex items-center justify-center aspect-video w-[90vw] max-w-[1000px] sm:mr-4 bg-gray-500 rounded">
        <FontAwesomeIcon className="w-24 h-24 text-gray-50" icon={faPlay} />
      </div>
      <div className="text-start self-start">
        <h3 className="text-2xl  font-bold mt-4">Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Necessitatibus doloribus laboriosam, porro esse, officiis et
        </p>
      </div>
      <Button className="mt-20 self-end">Share</Button>
    </div>
  );
};

export default Video;

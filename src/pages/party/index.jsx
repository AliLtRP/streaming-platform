import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import Chat from "../../components/Chat";
import useVideosStore from "../../store/Videos";
import { toast } from "react-hot-toast";

const Party = () => {
  const params = useParams();
  const { getVideo } = useVideosStore();
  const state = useVideosStore();
  const activeVideo = getVideo(params.party_id);
  console.log("activeVideo", state);
  const copyToClipboard = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard");
        console.log("URL copied to clipboard");
      } catch (err) {
        console.error("Failed to copy URL: ", err);
      }
    } else if (window.clipboardData) {
      // Internet Explorer
      window.clipboardData.setData("Text", url);
      toast.success("URL copied to clipboard");
      console.log("URL copied to clipboard");
    } else {
      // Fallback for other browsers
      const textarea = document.createElement("textarea");
      textarea.textContent = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success("URL copied to clipboard");
        console.log("URL copied to clipboard");
      } catch (err) {
        console.error("Failed to copy URL: ", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <div className="flex flex-row h-svh">
      <div className="flex flex-1 flex-col h-full px-20 py-10  justify-center items-center">
        <video
          src={`http://192.168.4.16:8080/stream/video/${params.party_id}`}
          controls
          type="video/mp4"
          className="flex-1 items-center justify-center aspect-video  h-[50%] w-[88%] sm:mr-4 bg-gray-500 rounded"
        ></video>
        <div className="text-start self-start">
          <h3 className="text-2xl font-bold mt-4">{activeVideo?.title}</h3>
          <p>{activeVideo?.description}</p>
        </div>
        <Button
          onClick={copyToClipboard}
          className="self-end mt-2 justify-self-end"
        >
          Share
        </Button>
      </div>
      <Chat />
    </div>
  );
};

export default Party;

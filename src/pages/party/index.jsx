import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import Chat from "../../components/Chat";
import useVideosStore from "../../store/Videos";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";




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

  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef(null); // Ref for the video element

  const socket = io('http://localhost:8080');

  useEffect(() => {
    let receivedChunks = [];

    socket.emit('video', "");

    socket.on('videoChunk', (data) => {
      receivedChunks.push(data.chunk);

      if (data.isFinal) {
        const videoBlob = new Blob(receivedChunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
      }
    });

    socket.on('videoError', (errorMessage) => {
      console.error(errorMessage);
      // Handle error
    });

    console.log(receivedChunks);
    // Clean up on unmount

    return () => {
      socket.disconnect();
    };

  }, []);

  useEffect(() => {
    let lastEmitTime = 0;
    const emitInterval = 2000; // emit every 2 seconds

    if (videoRef.current) {
      const handleTimeUpdate = () => {
        const currentTime = videoRef.current.currentTime;
        const now = Date.now();

        if (now - lastEmitTime > emitInterval) {
          socket.emit('startVideo', currentTime);
          lastEmitTime = now;
        }
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef.current, socket]);

  useEffect(() => {
    const syncThreshold = 0.5;

    socket.on("videoTime", (serverTime) => {
      if (videoRef.current) {
        const clientTime = videoRef.current.currentTime;
        if (Math.abs(clientTime - serverTime) > syncThreshold) {
          videoRef.current.currentTime = serverTime;
        }
      }
    });

    return () => {
      socket.off("videoTime");
    };
  }, [socket]);


  return (
    <div className="flex flex-row h-svh">
      <div className="flex flex-1 flex-col h-full px-20 py-10  justify-center items-center">
        {videoUrl && <video id="video" ref={videoRef} src={videoUrl} controls autoPlay />}
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

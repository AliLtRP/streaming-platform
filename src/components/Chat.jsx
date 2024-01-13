import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useHTTP from "../hooks/useHTTP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const socket = io("http://192.168.4.16:8000");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = (data) => {
    socket.emit("message", data.message);
    setValue("message", "");
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <>
      <div
        className={`hidden flex-col fixed lg:flex lg:relative right-0 top-0 min-w-[350px] w-[20vw] h-svh bg-gray-200 ${
          showChat && "!flex"
        }`}
      >
        <div className="px-4 py-2 text-2xl text-end cursor-pointer lg:hidden">
          <FontAwesomeIcon onClick={() => setShowChat(false)} icon={faXmark} />
        </div>
        <div className="flex-1 overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className="w-fit p-2 bg-blue-300 m-3 rounded-lg">
              <p>{message}</p>
            </div>
          ))}
        </div>
        <div className="flex p-2">
          <div className="flex-1">
            <TextInput
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage({ message: e.target.value });
                }
              }}
              {...register("message")}
              placeholder="Message"
              required
            />
          </div>
          <Button onClick={handleSubmit(sendMessage)} className="ml-2 ">
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>

      <Button
        onClick={() => setShowChat(true)}
        className={`absolute lg:hidden p-2 bottom-3 right-3 ${
          showChat && "hidden"
        }`}
      >
        <FontAwesomeIcon icon={faMessage} />
      </Button>
    </>
  );
};

export default Chat;

import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useHTTP from "../hooks/useHTTP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Chat = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showChat, setShowChat] = useState(false);

  const sendMessage = (data) => {
    console.log(data);
    setValue("message", "");
  };

  return (
    <>
      <div
        className={`hidden flex-col absolute lg:flex right-0 top-0 min-w-[350px] w-[20vw] h-screen bg-gray-200 ${
          showChat && "!flex"
        }`}
      >
        <div className="px-4 py-2 text-2xl text-end cursor-pointer lg:hidden">
          <FontAwesomeIcon onClick={() => setShowChat(false)} icon={faXmark} />
        </div>
        <div className="flex-1 overflow-y-scroll">
          <div className="w-fit p-3 bg-blue-300 m-5 rounded-lg">
            <p> Message Message MessageMessage Message</p>
          </div>
          <div className="w-fit p-3 bg-blue-200 m-5 rounded-lg">
            <p> Message</p>
          </div>
          <div className="w-fit p-3 bg-blue-200 m-5 rounded-lg">
            <p> Message</p>
          </div>
          <div className="w-fit p-3 bg-blue-200 m-5 rounded-lg">
            <p> Message</p>
          </div>
          <div className="w-fit p-3 bg-blue-200 m-5 rounded-lg">
            <p> Message</p>
          </div>

          <div className="w-fit p-3 bg-blue-200 m-5 rounded-lg">
            <p> Message</p>
          </div>
        </div>
        <div className="flex p-2">
          <div className="flex-1">
            <TextInput
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

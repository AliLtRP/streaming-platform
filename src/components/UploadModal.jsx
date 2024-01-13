import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useHTTP from "../hooks/useHTTP";

const UploadModal = ({ openModal, setOpenModal, refresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendHTTP, response] = useHTTP();

  const handleUpload = async (data) => {
    console.log(data);
    const res = await sendHTTP(
      "/user/video/upload",
      "POST",
      {
        title: data.title,
        description: data.description,
        video: data.video[0],
      },
      true
    );

    if (res.data) {
      setOpenModal(false);
      refresh();
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Video Details
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput {...register("title")} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput {...register("description")} type="text" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
              </div>
              <FileInput accept="video/*" {...register("video")} />
            </div>
            <div className="w-full mt-4">
              <Button onClick={handleSubmit(handleUpload)}>Upload</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadModal;

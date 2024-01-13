import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useHTTP from "../hooks/useHTTP";

const UploadModal = ({ openModal, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendHTTP, response] = useHTTP();

  const handleUpload = (data) => {
    sendHTTP("/video", "POST", data, true);
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
              <FileInput {...register("video")} />
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

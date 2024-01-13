// write the zustand store logic to store the videos title and description

import { create } from "zustand";

const useVideos = create((set) => ({
  videos: [],
  setVideos: (videos) => set({ videos }),
  getVideo: (id) => {
    const video = useVideos((state) =>
      state.videos.find((video) => video._id === id)
    );
    return video;
  },
}));

export default useVideos;

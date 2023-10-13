import axios from "axios";
export const uploadImage = async (...files) => {
  console.log(files);
  const CLOUD_NAME = "dqzkwwpfp";
  const PRESET_NAME = "ASM_React";
  const FOLDER_NAME = "ASM_GD2";
  const urls = [];
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);

  for (const file of files) {
    formData.append("file", file);
    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      urls.push(response.data.secure_url);
      console.log(urls);
    } catch (err) {
      console.log(err);
    }
  }
  return urls;
};

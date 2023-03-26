import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
export const firebaseImage=async(data)=>{

    const dirs = Date.now();
    const rand = Math.random();
    const image = data;
    const imageRef = ref(
      storage,
      `/doctorImages/${dirs}${rand}_${image?.name}`
    );
    const toBase64 = (image) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }).catch((err) => {
     console.log(err.message);
      });
    const imgBase = await toBase64(image);
    await uploadString(imageRef, imgBase, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
       data = downloadURL;
    });
    
    return data
}
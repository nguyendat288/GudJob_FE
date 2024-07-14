import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { imageDb } from './firebaseConfig';

const customUploadAdapter = (loader) => {
  return {
    upload: () => {
      return loader.file
        .then(file => new Promise((resolve, reject) => {
          const storageRef = ref(imageDb, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Handle progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              // Handle error
              reject(error);
            },
            () => {
              // Handle successful uploads
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve({
                  default: downloadURL
                });
              });
            }
          );
        }));
    },
    abort: () => {
      // Handle aborting upload
    }
  };
};

export default customUploadAdapter;

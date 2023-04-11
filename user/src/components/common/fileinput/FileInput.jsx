import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";

const FileInput = ({
  name,
  label,
  value,
  icon,
  type,
  handleInputState,
  ...rest
}) => {
  const inputRef = useRef();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    setProgressShow(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(
      storage,
      type === "image" ? `/images/${fileName}` : `/pdf/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
        alert("Eroare la incarcare!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleInputState(name, url);
          if (type === "audio") {
            const audio = new Audio(url);
            audio.addEventListener(
              "loadedmetadata",
              () => {
                const durata = Math.floor(audio.duration);
                handleInputState("durata", durata);
              },
              false
            );
          }
        });
      }
    );
  };

  return (
    <div className="file-container">
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          handleInputState(
            name,
            e.target.files[0],
            console.log("III" + name + e.target.files[0])
          );
          setVisible(!visible + "iiii" + console.log(!visible));
        }}
        vlaue={value}
        {...rest}
      />
      <button
        onClick={() => {
          inputRef.current.click();
        }}
        label={label}
      ></button>
      {type === "image" && value && (
        <img
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          alt="file"
          className="w-96"
        />
      )}
      {type === "audio" && value && (
        <audio
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          controls
        />
      )}
      <button
        onClick={handleUpload}
        startIcon={<AiOutlineCloudUpload />}
        label="Incarca"
        className={`bg-transparent border-[1px] border-gray-300 px-6 py-3 mt-3 ${
          visible ? "visible" : "invisible"
        }`}
      >
        Upload
      </button>
      {/* )} */}
      {progressShow && progress < 100 && (
        <div className="progress_container">
          <p>{progress}%</p>
        </div>
      )}
      {progress === 100 && (
        <div className="progress_container">
          <AiFillCheckCircle className="success fill-green-500" />
        </div>
      )}
    </div>
  );
};

export default FileInput;

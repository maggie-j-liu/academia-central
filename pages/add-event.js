import NotSignedIn from "components/NotSignedIn";
import { useState, useRef } from "react";
import useUser from "utils/firebase/useUser";
import initFirebase from "utils/firebase/setup";
import firebase from "firebase/app";

initFirebase();
const AddEvent = () => {
  const defaults = {
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    websiteUrl: "",
    tags: [],
  };
  const [formData, setFormData] = useState(defaults);
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useUser();
  const imageRef = useRef();
  const changeData = (key, value) => {
    const prevData = formData;
    formData[key] = value;
    setFormData({ ...prevData });
    if (
      ["eventName", "description", "startDate", "endDate", "location"].every(
        (val) => formData[val] !== ""
      )
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleImageChange = (event) => {
    if (event.target.files?.[0]) {
      setFilename(event.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        "load",
        async (e) => {
          setImage(e.target.result);
        },
        false
      );
    } else {
      setFilename("");
      setImage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      changeData("tags", [...formData.tags, e.target.value]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagIdx) => {
    const newTags = formData.tags;
    newTags.splice(tagIdx, 1);
    changeData("tags", newTags);
  };
  const submitData = async () => {
    setIsDisabled(true);
    const eventId = await fetch("/api/add-event", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        userId: user.uid,
      }),
    }).then((res) => res.text());
    const storageRef = firebase.storage().ref();
    const eventImagesRef = storageRef.child(
      `eventImages/${eventId}/${filename}`
    );
    const snap = await eventImagesRef.putString(image, "data_url");
    const url = await snap.ref.getDownloadURL();
    await fetch("/api/add-image-url", {
      method: "POST",
      body: JSON.stringify({
        userId: user.uid,
        eventId,
        imageUrl: url,
      }),
    });
    setFormData(defaults);
    setFilename("");
    setImage("");
    imageRef.current.value = "";
  };

  if (!user) {
    return (
      <>
        <NotSignedIn />
      </>
    );
  }
  return (
    <div className={"w-3/4 max-w-3xl mx-auto my-8"}>
      <h1 className={"text-4xl font-semibold text-center mt-8 mb-6"}>
        Add Your Event!
      </h1>
      <div className={"flex flex-col"}>
        <div className={"space-y-8"}>
          <label className={"block"}>
            <p>
              Event Name <span>*</span>
            </p>
            <input
              value={formData.eventName}
              onChange={(e) => changeData("eventName", e.target.value)}
              type="text"
              className={"form-input input-box w-full"}
            />
          </label>
          <label className={"block"}>
            <p>
              Description <span>*</span>
            </p>
            <textarea
              value={formData.description}
              onChange={(e) => changeData("description", e.target.value)}
              className={"form-textarea input-box w-full"}
              placeholder={"A description of your event"}
            />
          </label>

          <div className={"space-y-4"}>
            <label className={"block"}>
              <p>Tags</p>
              <input
                type={"text"}
                placeholder={"Hit enter to add tags that describe your event"}
                className={"form-input input-box w-full"}
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </label>
            <div className={"flex flex-wrap gap-2"}>
              {formData.tags.map((tag, idx) => (
                <div
                  className={
                    "bg-primary-100 hover:bg-primary-200 focus:bg-primary-200 px-3 py-0.5 flex items-center rounded-full"
                  }
                >
                  <span>{tag}</span>
                  <button
                    className={"inline focus-ring rounded-sm ml-1"}
                    type="button"
                    onClick={() => removeTag(idx)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={"flex justify-between"}>
            <label className={"block"}>
              <p>
                Start Date <span>*</span>
              </p>
              <input
                value={formData.startDate}
                type={"date"}
                className={"form-input input-box"}
                onChange={(e) => changeData("startDate", e.target.value)}
              />
            </label>
            <label className={"block"}>
              <p>
                End Date <span>*</span>
              </p>
              <input
                value={formData.endDate}
                type={"date"}
                className={"form-input input-box"}
                onChange={(e) => changeData("endDate", e.target.value)}
              />
            </label>
          </div>
          <label className={"block"}>
            <p>
              Location <span>*</span>
            </p>
            <input
              value={formData.location}
              type={"text"}
              className={"form-input input-box w-full"}
              onChange={(e) => changeData("location", e.target.value)}
            />
          </label>
          <label className={"block"}>
            <p>Website URL</p>
            <input
              value={formData.websiteUrl}
              type={"text"}
              className={"form-input input-box w-full"}
              onChange={(e) => changeData("websiteUrl", e.target.value)}
            />
          </label>
          <input
            type={"file"}
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            ref={imageRef}
          />
        </div>
        <button
          type="submit"
          className={
            "disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md mt-2 px-5 py-2 self-end bg-primary-100 hover:bg-primary-200 focus:bg-primary-200 focus-ring"
          }
          disabled={isDisabled}
          onClick={() => submitData()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddEvent;

import NotSignedIn from "components/NotSignedIn";
import { useState } from "react";
import useUser from "utils/firebase/useUser";
const AddEvent = () => {
  const defaults = {
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    websiteUrl: "",
  };
  const [formData, setFormData] = useState(defaults);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useUser();
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
  const submitData = async () => {
    await fetch("/api/add-event", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        userId: user.uid,
      }),
    });
    setFormData(defaults);
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

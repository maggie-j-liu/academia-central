
import { useState, useRef } from "react";
import initFirebase from "utils/firebase/setup";

initFirebase();


const profile = () => {
  const defaults = {
    tags: [],
  };
  const [formData, setFormData] = useState(defaults);

  const [currentTag, setCurrentTag] = useState("");

  
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      changeData("tags", [...formData.tags, e.target.value]);
      setCurrentTag("");
    }
  };
  return (
    <div className={"w-3/4 max-w-3xl mx-auto my-8"}>
      <div className={"flex flex-col"}>
        <div className={"space-y-8"}>
          <label className={"block"}>
            <p>Tags</p>
            <input
              type={"text"}
              placeholder={"Add tags that describe your interests"}
              className={"form-input input-box w-full"}
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
          <div className={"flex flex-wrap gap-2"}>
            {formData.tags.map((tag) => (
              <div className={"bg-gray-100 px-2 py-0.5"}>
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
  
export default profile;
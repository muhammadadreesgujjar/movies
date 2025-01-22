import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const UploadMovieCard = ({
  fileName,
  handleChangeFile,
  handleChange,
  inputValue,
  error,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  return (
    <div className="parrentBox flex flex-col md:flex-row gap-8 pt-16">
      <div className="w-full h-full">
        <div className="rounded-xl flex flex-col justify-center items-center w-56 h-44 md:w-96 md:h-96 border-2 border-dotted">
          <button
            type="button"
            onClick={() => document.getElementById("inputfile").click()}
            className="flex flex-col justify-center items-center h-full"
          >
            {fileName ? (
              <div className="p-4 h-full">
                <img
                  src={fileName}
                  alt="alt"
                  className="rounded-2xl object-cover h-full"
                  height="100%"
                  width="100%"
                />
              </div>
            ) : (
              <>
                <div className="w-4 md:w-10">
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    style={{ fontSize: "45px" }}
                  />
                </div>
                <h1 className="text-xs my-2">Drop an image here</h1>
              </>
            )}
            <input
              type="file"
              id="inputfile"
              className="hidden"
              onChange={handleChangeFile}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <InputField
          name="name"
          placeholder="Title"
          value={inputValue.name}
          onchange={handleChange}
          err={error.name}
        />
        <InputField
          name="publishYear"
          placeholder="Publish Year"
          value={inputValue.publishYear}
          onchange={handleChange}
          err={error.publishYear}
        />
        <div className="flex gap-3">
          <button
            type="button"
            className="button buttonSecond w-full h-11 border-2 border-white rounded-lg font-semibold"
            onClick={() => navigate(`/`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="button h-11 w-full rounded-lg font-semibold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMovieCard;

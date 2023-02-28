import React from "react";
import { IconButton, Input } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { putDataAPI } from "utils/fetchData";
import { setIsEditing, setProfileUpdate } from "state/authSlice";

const ProfilePhotoEdit = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  const handleFileChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append("picturePath", selectedFile.name);
      const { data } = await putDataAPI(
        `/auth/update/${userId}`,
        formData,
        token
      );
      if (data) {
        dispatch(setProfileUpdate({ userDetails: data }));
        dispatch(setIsEditing(false));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Input
        type="file"
        id="upload-button"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="upload-button">
        <IconButton component="span">
          <CameraAlt />
        </IconButton>
      </label>
    </>
  );
};

export default ProfilePhotoEdit;

import React from "react";
import { IconButton, Input } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIsEditing } from "state";

const ProfilePhotoEdit = () => {
  const dispatch = useDispatch()
  const boolValue = useSelector((state)=>state.isEditing)
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append("picturePath", selectedFile.name);

    await axios
    .put(`${process.env.REACT_APP_BASE_URL}/auth/update/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const savedUser = res.data;
      dispatch(setIsEditing({boolValue:false}))
    })
    .catch((error) => {
      console.error(error);
    });
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

import { Box } from "@mui/system";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePhotoEdit from "scenes/widgets/ProfilePhotoEdit";
import { setIsEditing } from "state/authSlice";

const UserImage = ({ image, size = "60px", isProfile }) => {
  const dispatch = useDispatch()
  const isEditing = useSelector((state)=>state.isEditing)
  // const [isEditing, setIsEditing] = useState(boolValue);

  const handleBoxClick = () => {
    dispatch(setIsEditing(true))
  };

  if(isProfile){
    return isEditing ? (<ProfilePhotoEdit />) : (
      <Box
        width={size}
        height={size}
        sx={{ cursor: "pointer" }}
        onClick={()=>handleBoxClick()}
      >
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={image}
        />
      </Box>
    );
  }

  return (
    <Box
      width={size}
      height={size}
      sx={{ cursor: "pointer" }}
    >
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;

import { useState } from "react";

function ProfilePhotoEdit() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropper, setCropper] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCrop = () => {
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
    }
  };

  const handleSave = () => {
    // TODO: Upload the cropped image to the server and update the user's profile photo
    // with the new URL.
  };

  return (
    <div>
      <h3>Edit Profile Photo</h3>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" ref={(cropper) => setCropper(cropper)} />
          <button onClick={handleCrop}>Crop</button>
        </div>
      )}
      {croppedImage && (
        <div>
          <img src={croppedImage} alt="Cropped" />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}
export default ProfilePhotoEdit
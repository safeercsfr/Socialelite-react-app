import config from "./config";
import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(config.SERVER_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const postDataAPI = async (url, { userId, comment }, token) => {
  const res = await axios.post(
    config.SERVER_URL + url,
    { userId, comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const putDataAPI = async (url, formData, token) => {
  const res = await axios.put(
    config.SERVER_URL + url,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};

export const patchDataAPI = async (url, userId, token) => {
  const res = await axios.patch(
    config.SERVER_URL + url,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    }
  );
  return res;
};

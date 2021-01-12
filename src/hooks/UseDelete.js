import axios from "axios";

const UseDeleteData = (url, token, callback) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + token,
    },
    url: url,
    method: "delete",
  };

  const deleteData = async () => {
    const response = await axios(options);
    return response;
  };

  deleteData()
    .then((result) => {
      return callback(result);
    })
    .catch((error) => {
      if (error.response) {
        return callback(error);
      }
    });
};

export default UseDeleteData;

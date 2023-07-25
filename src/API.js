// File: API.js
export const fetchDataFromApi = () => {
  return fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data."); //Error handling is done as mentioned in last feedback
    }
    return response.json();
  });
};

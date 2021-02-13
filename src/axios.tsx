import axios from "axios";
import React from "react";

const BASE_URL = "https://kj-api.herokuapp.com/bugs/";
//! const BASE_URL = "http://localhost:8080/bugs/";
export default function Http(
  type: string,
  completed?: boolean,
  versionNum?: number
) {
  const [responseData, setResponseData] = React.useState<any>([]);
  const [refresh, SetRefresh] = React.useState<number>(0);

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    let ref = setTimeout(function () {
      SetRefresh(refresh + 1);
      console.log(refresh);
    }, 10000);

    switch (type.toLowerCase()) {
      case "status":
        axios
          .get(`${BASE_URL}completed/${completed}`, {
            cancelToken: source.token,
          })
          .then((response) => {
            setResponseData(response.data);
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "version":
        axios
          .get(`${BASE_URL}version/${versionNum}`, {
            cancelToken: source.token,
          })
          .then((response) => {
            setResponseData(response.data);
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "all":
        axios
          .get(`${BASE_URL}`, { cancelToken: source.token })
          .then((response) => {
            setResponseData(response.data);
          })

          .catch((error) => {
            console.log(error);
          });
        break;

      default:
        console.log("error");
        break;
    }

    return () => {
      source.cancel();
      clearTimeout(ref);
    };
  }, [completed, refresh, type, versionNum]);
  return responseData;
}

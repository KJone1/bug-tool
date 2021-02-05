import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:8080/bugs/";

export default function Http(
  type: String,
  completed?: Boolean,
  version?: Number
) {
  const [responseData, setResponseData] = React.useState<any>([]);
  const [refresh, SetRefresh] = React.useState<number>(0);

  React.useEffect(() => {
    let ref = setTimeout(function () {
      SetRefresh(refresh + 1);
      console.log(refresh);
    }, 10000);

    switch (type.toLowerCase()) {
      case "status":
        axios
          .get(`${BASE_URL}completed/${completed}`)
          .then((response) => {
            setResponseData(response.data);
            console.log(response);
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "version":
        axios
          .get(`${BASE_URL}version/${version}`)
          .then((response) => {
            setResponseData(response.data);
            console.log(response);
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "all":
        axios
          .get(`${BASE_URL}`)
          .then((response) => {
            setResponseData(response.data);
            console.log(response);
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
      clearTimeout(ref);
    };
  }, [completed, refresh, type, version]);
  return responseData;
}

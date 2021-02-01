import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:8080/bugs/completed/";

export default function Http(completed: Boolean) {
  const [responseData, setResponseData] = React.useState<any>([]);
  const [refresh, SetRefresh] = React.useState<any>(0);

  React.useEffect(() => {
    let ref = setTimeout(function () {
      SetRefresh(refresh + 1);
      console.log(refresh);
    }, 8000);

    axios
      .get(`${BASE_URL}${completed}`)
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
    return () => {
      clearTimeout(ref);
    };
  }, [completed, refresh]);
  return responseData;
}

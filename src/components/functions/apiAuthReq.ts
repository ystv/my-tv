// IMPORTANT FUNCTION for use in all API calls
// Will attempt to call the API with your jwt,
// if request fails it assumes token is expired and attempts to get new one before repeating the request
// redirects to login page by default if authentication fails

// This will return
// - null if it cannot get anything from the api
// - undefinied if it cannot authenticate the user (only if redirect is disabled)
// - body json object if successful

const apiAuthReq = (url: string, redirect: boolean = true) => {
  const fetchURL = `${process.env.REACT_APP_API_BASEURL}${url}`;
  let apiData = fetch(fetchURL, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .catch(() => {
      let a1 = fetch(
        `${process.env.REACT_APP_SECURITY_ENDPOINT}/api/set_token`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          if (!res.ok) throw Error(res.statusText);
        })
        .then(() => {
          let a2 = fetch(fetchURL, {
            credentials: "include",
          })
            .then((res) => {
              if (!res.ok) throw Error(res.statusText);
              return res.json();
            })
            .catch((e) => {
              console.log("unsuccessful after try 2: ", e);
              return null;
            });
          return a2;
        })
        .catch((err) => {
          console.log("could not auth: ", err);
          if (redirect === true) {
            window.location.href = `${process.env.REACT_APP_SECURITY_ENDPOINT}/?callback=${window.location}`;
          }
          return undefined;
        });
      return a1;
    });
  return apiData;
};

export default apiAuthReq;

// IMPORTANT FUNCTION for use in all API calls
// Will attempt to call the API with your jwt,
// if request fails it assumes token is expired and attempts to get new one before repeating the request

// This will return
// - null if it cannot get anything from the api
// - undefinied if it cannot authenticate the user
// - body json object if successful

export default (url: string) => {
  let apiData = fetch(url, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .catch(() => {
      let a1 = fetch("https://comp.ystv.co.uk/api/set_token", {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText);
        })
        .then(() => {
          let a2 = fetch(url, {
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
          return undefined;
        });
      return a1;
    });
  return apiData;
};

//export default (url: string) => {
//  let apiData = fetch(url, {
//    method: "GET",
//    credentials: "include",
//  })
//    .then((res) => {
//      if (!res.ok) throw Error(res.statusText);
//      return res.json();
//    })
//    .then((e) => {
//      console.log("successful try 1: ", e);
//      return e;
//    })
//    .catch((e) => {
//      console.log("unsuccessful try 1: ", e);
//      console.log("attempting re-auth");
//
//      fetch("https://comp.ystv.co.uk/api/set_token", {
//        method: "GET",
//        credentials: "include",
//      })
//        .then((e) => {
//          console.log("comp auth status ", e.status);
//        })
//        .then(() => {
//          fetch(url, {
//            method: "GET",
//            credentials: "include",
//          })
//            .then((res) => {
//              if (!res.ok) throw Error(res.statusText);
//              return res.json();
//            })
//            .then((e) => {
//              console.log("successful try 2: ", e);
//              return e;
//            })
//            .catch((e) => {
//              console.log("unsuccessful try 2: ", e);
//            });
//        });
//    });
//  return apiData;
//};

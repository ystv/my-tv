const config = {
  wapiBase: process.env.REACT_APP_API_BASEURL ?? "",
  wauthBase: process.env.REACT_APP_SECURITY_BASEURL ?? "",
  clapperBase: "/v1/internal/clapper",
  peopleBase: "/v1/internal/people",
  miscBase: "/v1/internal/misc",
};

export default config;

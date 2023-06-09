const config = {
  wapiBase: import.meta.env.PUBLIC_API_BASEURL ?? "",
  wauthBase: import.meta.env.PUBLIC_SECURITY_BASEURL ?? "",
  clapperBase: "/v1/internal/clapper",
  peopleBase: "/v1/internal/people",
  miscBase: "/v1/internal/misc",
};

export default config;

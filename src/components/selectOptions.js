const selectOption = () => {
  // configure cors
  const origin =
    process.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://164.92.84.16";
  const corsOptions = {
    origin: origin,
    credentials: true,
  };

  return { corsOptions };
};

export default selectOption;

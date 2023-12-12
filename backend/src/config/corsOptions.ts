import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, success?: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      console.log("Allowed Origin: ", origin);
      callback(null, true);
    } else {
      console.log("Not Allowed Origin: ", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};


export default corsOptions;

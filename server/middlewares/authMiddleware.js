import jwt from "jsonwebtoken";

const isAuthenticate = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);

    if (!token) {
        return res.json({
        Status: false,
        message: "Token is not provided in the request body",
        });
    }
  //  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7IkVtYWlsIjoibmVlcmFqcm4uNzg2QGdtYWlsLmNvbSIsIlJvbGwiOiJNYW5hZ2VyIn0sImlhdCI6MTcwOTg3OTY5NCwiZXhwIjoxNzA5ODgzMjk0fQ.V90LrLMi6wXV5-4pvyFpTnix8Sa_mkuUS8RF52bzeGg";
  // console.log("requested user",req.user);
  // console.log("token is", token);

  // if (!token) {
  //     return res.json({ Status: false, message: "Token is not accessible" });
  // }

  try {
    const decode = jwt.verify(token, "jwt_secret_key");
    console.log("user Information", decode);
    req.user = decode;
    next();
  } catch (error) {
    return res.json({ Status: false, message: "Token is invalid" });
  }
};

const isCustomer = (req, res, next) => {
    // console.log("is Customer", req.user.Roll);

    try {
    if (req.user.Roll !=="Customer") {
      return res.json({
        Status: false,
        message: "protected routes for this role ",
      });
    }
    next();
  } catch (error) {
    return res.json({ Status: false, message: "User roll is not matching" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.roll !== "Admin") {
      return res.json({
        Status: false,
        message: "protected routes for this role ",
      });
    }
    next();
  } catch (error) {
    return res.json({ Status: false, message: "User roll is not matching" });
  }
};

export { isAdmin, isCustomer, isAuthenticate };


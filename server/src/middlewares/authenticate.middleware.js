import { verifyAccessToken } from "../utils/auth.util.js";


export const authenticate = async(req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  //console.log(accessToken)
  if (!accessToken) {
    return res.status(401).json({
      message: `Access token not found in the request header`,
    });
  }

  try {
    const data = await verifyAccessToken(accessToken);
    //console.log(data)
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Invalid or expired access token`,
    });
  }
};

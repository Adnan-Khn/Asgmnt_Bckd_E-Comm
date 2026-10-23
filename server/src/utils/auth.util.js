import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


export const generateAccessToken = async ({userId}) => {
  const accessToken = await jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET,{expiresIn:"1d"});
  return accessToken;
};

export const generateRefreshToken = async ({userId}) => {
  const refreshToken = await jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
  return refreshToken;
};

export const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  return data;
};

export const verifyRefreshToken = async (refreshToken) => {
  const data = await jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  return data;
};
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.util.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  const { email, name, password } = req.body;

  const existedUser = await userModel.findOne({ email });

  if (existedUser) {
    return res.status(409).json({
      message: `User already exists with the email address`,
      errors: [
        {
          field: "email",
          message: "User already exists with this email address",
        },
      ],
    });
  }
  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });

  const accessToken = await generateAccessToken({ userId: user._id });
  const refreshToken = await generateRefreshToken({ userId: user._id });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  //console.log(password,user.password)
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = await generateAccessToken({ userId: user._id });
  const refreshToken = await generateRefreshToken({ userId: user._id });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(200).json({
    message: "User logged-in successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
};

export const refreshController = async (req, res) => {
  //console.log("COOKIES:", req.cookies);
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh Token not found",
    });
  }

  try {
    const decode = await verifyRefreshToken(refreshToken);
    const { userId } = decode;
    console.log(userId);

    const user = await userModel.findById(userId);

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(400).json({
        message: "Refresh Token mismatch",
      });
    }

    const accessToken = await generateAccessToken({
      userId,
    });

    const newRefreshToken = await generateRefreshToken({
      userId,
    });

    await userModel.findByIdAndUpdate(userId, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Token refresh successfully",

      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Refresh Token :",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  const { userId } = req.user;
  console.log(userId)
  const user = await userModel.findById(userId);

  res.clearCookie("refreshToken");
  
  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  }
  
  await userModel.findByIdAndUpdate(userId, { refreshToken: null });

  return res.status(200).json({
    message: "User Logged out successfully",
    data: {
      user,
    },
  });
};

export const meController = async (req, res) => {
  const { userId } = req.user;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "No user found",
    });
  }

  res.status(200).json({
    message: "User fetched successfully",
    user: {
      id: userId,
      name: user.name,
      email: user.email,
    },
  });
};

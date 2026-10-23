import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_SECRET,
});

export const uploadFiles = async ({ buffer, fileName }) => {
  const res = await client.files.upload({
    file: await toFile(buffer),
    fileName,
    folder: "Assignment_E-Comm",
  });
  return res;
};

export const deleteFile = async (fileId) => {
  await client.files.delete(fileId);
};


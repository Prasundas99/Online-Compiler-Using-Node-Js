import asyncHandler from "express-async-handler";
import { generateFile } from "../utils/generateFile.js";

/**
 * @description Compile/run the inputted code
 * @route GET /run
 * @public
 *
 */
export const compileCode = asyncHandler(async (req, res) => {
  const { language = "cpp", code } = req.body;
  console.log(req.body);
  //Check if any code is passed or not
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  //generate C++ file with content from request
  const filePath = await generateFile(language, code);

  res.status(200).json({ filePath, language, code });
});

import asyncHandler from "express-async-handler";
import { generateFile } from "../utils/generateFile.js";
import { executePy } from "../utils/executeCode.js";

/**
 * @description Compile/run the inputted code
 * @route POST /run
 * @public
 *
 */
export const compileCode = asyncHandler(async (req, res) => {
  const { language = "py", code } = req.body;
  console.log(req.body);

  //Check if any code is passed or not
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    //generate a code file with content from request
    const filePath = await generateFile(language, code);
    //We need to run the file and send the output
    const output = await executePy(filePath);
    console.log(output);
    res.status(200).json({ filePath, language, code, output });
  } catch (error) {
    res.status(500).json({ error });
  }
});

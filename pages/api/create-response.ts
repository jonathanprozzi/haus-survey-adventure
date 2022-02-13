import { NextApiHandler } from "next";
import { surveyTable } from "../../libs/airtable";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const createResponse: NextApiHandler = async (req, res) => {
  const questionCopy = req.body.questionCopy;
  const response = req.body.response;

  try {
    const airtableRecord = await surveyTable.create({
      questionCopy: questionCopy,
      response: response,
    });

    res.status(200).json({
      msg: "Response logged!",
      airtableRecord: airtableRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: "Something went wrong with your submission.",
    });
  }
};

export default createResponse;

import { NextApiHandler } from "next";
import { surveyTable } from "../../libs/airtable";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const createJoinUs: NextApiHandler = async (req, res) => {
  const questionId = req.body.questionId;
  const response = req.body.response;

  try {
    const airtableRecord = await surveyTable.create({
      questionId: questionId,
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

export default createJoinUs;

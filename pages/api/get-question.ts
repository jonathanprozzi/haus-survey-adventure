import { NextApiHandler } from "next";
import Airtable from "airtable";
import { minifyRecords } from "../../libs/airtable";
import { surveyTable } from "../../libs/airtable";

const getQuestion = (req, res) => {
  const questionId = req.query.id;
  console.log(questionId);

  return new Promise((resolve, reject) => {
    try {
      const airtableData = [];
      surveyTable
        .select({
          view: "Data",
        })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              const recordData = {
                questionId: record.questionId,
                fields: record.fields,
              };
              airtableData.push(recordData);
            });
            fetchNextPage();
          },
          (error) => {
            if (error) {
              console.error(error);
              reject({ error });
              return;
            }
            resolve(airtableData);
            console.log("airtable data", airtableData);
            const minifiedRecords = minifyRecords(airtableData);
            console.log("minified records", minifiedRecords);
            res.statusCode = 200;
            res.json(minifiedRecords);
          }
        );
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.json({ msg: "Something went wrong with the request." });
    }
  });
};

export default getQuestion;

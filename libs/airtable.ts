const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIR_API_KEY }).base(
  process.env.BASE_ID
);

const surveyTable = base(process.env.SURVEY_TABLE_NAME);

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { surveyTable, getMinifiedRecord, minifyRecords };

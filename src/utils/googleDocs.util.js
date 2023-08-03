const { google } = require("googleapis");
const googleAPIConfig = require("../config/googleAPI.config");

const serviceAccountKeyFile = googleAPIConfig.GOOGLE_APIS_KEYFILE;
const sheetId = googleAPIConfig.GOOGLE_APIS_SPREADSHEET_ID;
const tabName = googleAPIConfig.GOOGLE_APIS_SPREADSHEET_TAB_NAME;
const range = "A:E";

const writeToGoogleSheet = async (dataToBeInserted) => {
  const googleSheetClient = await _getGoogleSheetClient();

  await _writeGoogleSheet(
    googleSheetClient,
    sheetId,
    tabName,
    range,
    dataToBeInserted
  );
};

const list = async (keyWordParam) => {
  const googleSheetClient = await _getGoogleSheetClient();

  const data = await _readGoogleSheet(
    googleSheetClient,
    sheetId,
    tabName,
    range
  );

  // const { data } = require("../../array");

  const filteredData = data.filter((row) =>
    row.some((item) => item.toLowerCase().includes(keyWordParam.toLowerCase()))
  );

  if (!filteredData.length) {
    return `Tidak ada data dengan keyword ${keyWordParam}`;
  }

  const mappedData = filteredData
    .map((row) => {
      return `[${row[0]} | ${row[1]} - ${row[2]}](<${row[3]}>)`;
    })
    .join("\n");

  const result = `List Job Vacancy dengan Keyword ${keyWordParam}

${mappedData}

Dokumen lengkap ada di https://bit.ly/jobregceh
  `;

  return result;
};

const _getGoogleSheetClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
};

const _readGoogleSheet = async (googleSheetClient, sheetId, tabName, range) => {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
};

const _writeGoogleSheet = async (
  googleSheetClient,
  sheetId,
  tabName,
  range,
  data
) => {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: data,
    },
  });
};

module.exports = { writeToGoogleSheet, list };

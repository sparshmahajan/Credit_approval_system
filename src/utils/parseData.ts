const readXlsxFile = require("read-excel-file/node");

export const parseDataFromExcel = async (filepath: string) => {
  const rows = await readXlsxFile(filepath);
  return rows;
};

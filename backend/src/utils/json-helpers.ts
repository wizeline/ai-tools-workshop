const fs = require("fs");

export const getPath = (tableName: string) => {
  const path = require("path");
  return path.resolve(__dirname, `../../db/${tableName}.json`);
};

export const readAllTable = async (tableName: string): Promise<any> => {
  if (!tableName) {
    throw new Error("tableName is required!");
  }
  return new Promise((resolve, reject) =>
    fs.readFile(getPath(tableName), "utf8", (err: Error, data: any) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    })
  );
};

export const writeTable = async (tableName: string, data: any) => {
  if (!tableName) {
    throw new Error("tableName is required!");
  }
  if (!data) {
    throw new Error("data is required!");
  }
  return new Promise((resolve, reject) =>
    fs.writeFile(getPath(tableName), JSON.stringify(data), (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  );
};

export const createElement = async (tableName: string, data: any) => {
  if (!data) {
    throw new Error("data is required!");
  }
  const allData = await readAllTable(tableName);
  const id = (Object.keys(allData).length + 1).toString();
  allData[id] = { ...data, id };
  await writeTable(tableName, allData);
  return allData[id];
};

export const getAllTable = async (tableName: string) => {
  const data = await readAllTable(tableName);
  return Object.values(data);
};

export const getElementById = async (tableName: string, id: string) => {
  if (!id) {
    throw new Error("id is required!");
  }
  const data = await readAllTable(tableName);
  return data[id];
};

export const updateElementById = async (
  tableName: string,
  id: string,
  data: any
) => {
  if (!id) {
    throw new Error("id is required!");
  }
  if (!data) {
    throw new Error("data is required!");
  }
  const allData = await readAllTable(tableName);
  allData[id] = { ...allData[id], ...data };
  await writeTable(tableName, allData);
  return allData[id];
};

export const deleteElementById = async (tableName: string, id: string) => {
  if (!id) {
    throw new Error("id is required!");
  }
  const allData = await readAllTable(tableName);
  delete allData[id];
  await writeTable(tableName, allData);
  return;
};

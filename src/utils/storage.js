const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getData = (date, key) => {
  const data = getStorageData(key);
  if (data && data[key] && data[key][date]) {
    return data[key][date];
  }
  
  return [];
};

export const setData = (date, key, rowIndex, entryKey, value) => {
  let data = getStorageData(key);
  
  if (!data || !data[key]) {
    data = {
      ...data,
      [key]: {
        [date]: {
          [`row-${rowIndex}`]: {
            [entryKey]: value
          }
        }
      }
    };
  } else {
    data[key][date][`row-${rowIndex}`] = {
      ...data[key][date][`row-${rowIndex}`],
      [entryKey]: value
    };
  }
  setStorageData(key, data);
  return data;
}
const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getData = (date, key) => {
  const data = getStorageData(key);
  if (data && data[date] && data[date][key]) {
    return data[date][key];
  }
  
  return [];
};

export const setData = (date, key, rowIndex, entryKey, value) => {
  let data = getStorageData(key);
  
  if (!data || !data[date]) {
    data = {
      ...data,
      [date]: {
        [key]: {
          [`row-${rowIndex}`]: {
            [entryKey]: value
          }
        }
      }
    };
  } else {
    data[date][key][`row-${rowIndex}`] = {
      ...data[date][key][`row-${rowIndex}`],
      [entryKey]: value
    };
  }
  setStorageData(key, data);
  return data;
}
const isSupportIndexDB = (): Object => {
  return { window: window.indexedDB, self: self.indexedDB };
};

const getDatabases = (storeName: string, version: number) => {
  return new Promise<object>((resolve, reject) => {
    let db = null;
    const request = self.indexedDB.open(storeName, version);

    request.onsuccess = function () {
      db = request.result;
      resolve(db);
    };
    request.onerror = function () {
      db = request.error;
      reject(db);
    };
    request.onupgradeneeded = function () {
      console.log('Create new store or upgrade store version');
    };
  });
};

export { isSupportIndexDB, getDatabases };

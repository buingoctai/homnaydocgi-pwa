import { getDatabases } from './utils/index';

class DbManager {
  getDbList(storeList: { name: string; version: number }[]) {
    const dbHandlers = storeList.map((store) => getDatabases(store.name, store.version));
    return Promise.all(dbHandlers);
  }
}

const dbManager = new DbManager();
export default dbManager;

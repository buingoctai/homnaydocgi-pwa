
import {getStore} from './utils/index';

class DbManager{
    getStoreList(storeList: {name:string,version:number}[]) {
       const storeHandlers = storeList.map(store => getStore(store.name,store.version));
       return Promise.all(storeHandlers);
    }
}

const dbManager = new DbManager();
export default dbManager;
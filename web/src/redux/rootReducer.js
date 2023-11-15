import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import clothesReducer from "./slices/clothes";
import typesReducer from "./slices/types";
import variantsReducer from './slices/variants';
import transactionReducer from "./slices/transaction";
import usersReducers from './slices/users';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

const rootReducer = combineReducers({
    clothes: clothesReducer,
    types: typesReducer,
    variants: variantsReducer,
    transactions: transactionReducer,
    users: usersReducers
})

export { rootPersistConfig, rootReducer}
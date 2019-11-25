import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { metricsReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage
  // whitelist: ["pomodoro", "chronometer", "task", "tick"]
};

const reducer = combineReducers({
  metrics: metricsReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const middlewares = [thunk];


const persistedReducer = persistReducer(persistConfig, rootReducer);

const redux_store = () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default redux_store

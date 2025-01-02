import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import loginReducer from './slices/authSlice.js';
import cartReducer from './slices/cartSlice.js';

const rootReducer = combineReducers({
    login: loginReducer,
    cart: cartReducer
})

const persistConfig = {
    key: 'root', // key for localStorage
    storage, // storage engine to use
    version: 1, // Versioning your persisted state
    // Add whitelist or blacklist to persist/exclude specific reducers
    //whitelist: ['cart'], // only cart will be persisted
    //blacklist: ['login'] // login will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

let persistor = persistStore(store);

export { persistor };
export default store
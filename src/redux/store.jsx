import { configureStore } from "@reduxjs/toolkit";

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан Redux
const rootReducer = (state) => {
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
});

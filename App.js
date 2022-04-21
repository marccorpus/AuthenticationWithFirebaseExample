import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { store } from "./src/store";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

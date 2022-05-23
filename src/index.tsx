import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
//@ts-ignore
import * as ReactDOM from "react-dom/client";

import { App } from "./App";
import TodoProvider from "./contexts/TodoContext";
import AuthProvider from "./contexts/AuthContext";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
let root;
if (container) {
  root = ReactDOM.createRoot(container);

  root.render(
    <TodoProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <App />
        </ChakraProvider>
      </AuthProvider>
    </TodoProvider>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

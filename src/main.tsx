import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

import { RootRouter } from "./RootRouter";
import { Provider } from "react-redux";
import "./i18n";
import HttpInterceptor from "./HttpInterceptor";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HttpInterceptor>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications />
          <Suspense>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <RootRouter />
              </PersistGate>
            </Provider>
          </Suspense>
        </MantineProvider>
      </QueryClientProvider>
    </HttpInterceptor>
  </React.StrictMode>
);

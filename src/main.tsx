import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

import { RootRouter } from "./RootRouter";
import { Provider } from "react-redux";
import "./i18n";
import HttpInterceptor from "./HttpInterceptor";
import * as Sentry from "@sentry/react";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

Sentry.init({
  dsn: "https://c1e016c736dc017d6ccc2b5fc2caa678@o4505725094002688.ingest.sentry.io/4505760685490176",
  maxBreadcrumbs: 50,
  tracesSampleRate: 1.0,
});

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

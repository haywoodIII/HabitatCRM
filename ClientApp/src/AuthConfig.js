import { PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
export const msalConfiguration = {
    auth: {
        clientId: "7385e621-98a1-41b4-b9e9-2403d668c173",
        authority: "https://login.microsoftonline.com/8f51ea41-de84-4476-b7db-a7c3025d3002/"
       
    }
  };

  export const scopes = ["api://ec559591-a3db-4011-8f2d-24dcbfb205e7/API"]

  export const pca = new PublicClientApplication(msalConfiguration);
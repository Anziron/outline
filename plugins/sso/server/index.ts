import Logger from "@server/logging/Logger";
import { PluginManager, Hook } from "@server/utils/PluginManager";
import config from "../plugin.json";
import router from "./router";
import env from "./env";

// Check if required environment variables are present
const enabled = !!(env.SSO_CLIENT_ID && env.SSO_CLIENT_SECRET);

// Plugin registration with logging (Requirements 8.7, 9.1, 10.2, 10.3, 10.4)
if (enabled) {
  PluginManager.add({
    ...config,
    type: Hook.AuthProvider,
    value: { router, id: config.id },
  });
  // Log successful registration (Requirement 9.2)
  Logger.info("plugins", "SSO plugin registered", {
    pluginId: config.id,
    pluginName: config.name,
    authUri: env.SSO_AUTH_URI,
    tokenUri: env.SSO_TOKEN_URI,
    userinfoUri: env.SSO_USERINFO_URI,
  });
} else {
  // Log warning when plugin is not registered (Requirement 9.1)
  Logger.warn(
    "plugins",
    "SSO plugin not registered: missing required environment variables (SSO_CLIENT_ID and SSO_CLIENT_SECRET)",
    {
      hasClientId: !!env.SSO_CLIENT_ID,
      hasClientSecret: !!env.SSO_CLIENT_SECRET,
    }
  );
}

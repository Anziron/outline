import { IsOptional, IsUrl } from "class-validator";
import { Environment } from "@server/env";
import environment from "@server/utils/environment";
import { CannotUseWithout } from "@server/utils/validators";

class SSOPluginEnvironment extends Environment {
  /**
   * SSO client credentials. To enable authentication with y-sso-system
   * OAuth2 provider.
   */
  @IsOptional()
  @CannotUseWithout("SSO_CLIENT_SECRET")
  public SSO_CLIENT_ID = this.toOptionalString(environment.SSO_CLIENT_ID);

  @IsOptional()
  @CannotUseWithout("SSO_CLIENT_ID")
  public SSO_CLIENT_SECRET = this.toOptionalString(
    environment.SSO_CLIENT_SECRET
  );

  /**
   * The SSO authorization endpoint URL.
   */
  @IsOptional()
  @IsUrl({
    require_tld: false,
    allow_underscores: true,
  })
  public SSO_AUTH_URI =
    environment.SSO_AUTH_URI ??
    "http://localhost:8000/api/v1/oauth2/authorize";

  /**
   * The SSO token endpoint URL.
   */
  @IsOptional()
  @IsUrl({
    require_tld: false,
    allow_underscores: true,
  })
  public SSO_TOKEN_URI =
    environment.SSO_TOKEN_URI ?? "http://localhost:8000/api/v1/oauth2/token";

  /**
   * The SSO userinfo endpoint URL.
   */
  @IsOptional()
  @IsUrl({
    require_tld: false,
    allow_underscores: true,
  })
  public SSO_USERINFO_URI =
    environment.SSO_USERINFO_URI ??
    "http://localhost:8000/api/v1/oauth2/userinfo";

  /**
   * A space separated list of SSO OAuth2 scopes to request.
   * Defaults to "openid profile email".
   */
  public SSO_SCOPES = environment.SSO_SCOPES ?? "openid profile email";
}

export default new SSOPluginEnvironment();

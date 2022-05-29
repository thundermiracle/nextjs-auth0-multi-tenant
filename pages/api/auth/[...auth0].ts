import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    await handleLogin(req, res, {
      authorizationParams: {
        redirect_uri: `${PROTOCOL}://${req.headers.host}/api/auth/callback`,
      },
    });
  },
  async logout(req: NextApiRequest, res: NextApiResponse) {
    await handleLogout(req, res, {
      returnTo: `${PROTOCOL}://${req.headers.host}`,
    });
  },
  async callback(req: NextApiRequest, res: NextApiResponse) {
    await handleCallback(req, res, {
      redirectUri: `${PROTOCOL}://${req.headers.host}`,
    });
  },
});

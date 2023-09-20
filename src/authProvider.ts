import { AuthBindings } from "@refinedev/core";
import {
  ForgotPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
} from "./types/Forms";
import { formatKenyanPhoneNumber } from "@/utils";
import { signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "./lib/next-auth-options";

export const authProvider: AuthBindings = {
  login: async ({ phoneNo, password }: LoginFormValues) => {
    try {
      const resp = await signIn("credentials", {
        phoneNo: formatKenyanPhoneNumber(phoneNo),
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });


      if (!resp.ok) {
        return {
          success: false,
          error: {
            name: "Auth Error",
            message: resp.error,
          },
        };
      }


      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (err) {
      return {
        success: false,
        error: {
          name: "Auth Error",
          message: err.message,
        },
      };
    }
  },
  logout: async () => {
    await signOut({
      callbackUrl: "/auth/login",
    });
    return {
      success: true,
      redirectTo: "/auth/login",
    };
  },
  check: async (ctx: any) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/auth/login",
      };
    }

    return {
      authenticated: true,
      identity: session.user,
    };
  },
  getPermissions: async () => {
    
  },
  getIdentity: async () => {
    
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },

  forgotPassword: async ({ phoneNo }: ForgotPasswordFormValues) => {
    try {
     

      return {
        success: true,
        redirectTo: "/auth/otp",
      };
    } catch (err) {
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: err.message,
        },
      };
    }
  },

  updatePassword: async ({
    phoneNo,
    password,
    confirmPassword: _confirm,
  }: ResetPasswordFormValues) => {
    try {
     
      return {
        success: true,
        redirectTo: "/auth/login",
      };
    } catch (err) {
      return {
        success: false,
        error: {
          name: "ResetPasswordError",
          message: err.message,
        },
      };
    }
  },
};

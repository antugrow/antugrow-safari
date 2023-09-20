import { AuthPage, ThemedTitleV2 } from "@refinedev/chakra-ui";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { AppIcon } from "src/components/app-icon";

export default function Login() {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Antugrow Safari"
          icon={<AppIcon />}
        />
      }
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};

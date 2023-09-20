import { authProvider } from "@/authProvider";
import CustomFormControl from "@/components/forms/CustomFormControl";
import { phoneNoRegex } from "@/utils";
import { Box, Button, Heading, useColorModeValue, Link as ChakraLink, chakra, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLink, useLogin } from "@refinedev/core";
import { LoginFormValues } from "@/types/Forms";
import { NextPageWithLayout } from "@/types/Layout";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { nextAuthOptions } from "@/lib/next-auth-options";
import { getServerSession } from "next-auth";
import Head from "next/head";

const errors = {
	CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
	default: "Something went wrong. Please try again later.",
};


enum FORM_ERRORS {
	REQUIRED = "field is required.",
	INVALID_FORMAT = "invalid field format.",
}

const formSchema = object({
	phoneNo: string().matches(phoneNoRegex, "Invalid phone number").required(FORM_ERRORS.REQUIRED),
	password: string().required("Password is required"),
});



const Login: NextPageWithLayout = () => {
	const router = useRouter();
	const { error } = router.query;
	const Link = useLink();
	const formMethods = useForm<LoginFormValues>({
		resolver: yupResolver(formSchema),
	});

	const importantTextColor = useColorModeValue("brand.500", "brand.200");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = formMethods;

	const { mutate: login, isLoading } = useLogin<LoginFormValues>();

	const onSubmit = async (data: LoginFormValues) => {
		login(data);
	};

	return (
		<>
			<Head>
				<title>Login - Antugrow</title>
			</Head>
			<FormProvider {...formMethods}>
				<Heading mb={"8"} textAlign={"center"} fontSize={"2xl"} color={useColorModeValue("brand.500", "brand.200")}>
					Sign in to your account
				</Heading>
				{/* {error && <SignInError error={error as string} />} */}
				<chakra.form onSubmit={handleSubmit(onSubmit)}>
					<CustomFormControl name="phoneNo" label="Phone Number" placeholder="0712345678" error={errors.phoneNo} register={register} />
					<CustomFormControl name="password" label="Password" placeholder="********" type="password" error={errors.password} register={register} />
					<Button mt="6" type="submit" width="full" colorScheme="brand" isLoading={isLoading}>
						Sign In
					</Button>
					<Box mt={"6"}>
						<ChakraLink as={Link} to="/auth/forgot-password" color={importantTextColor}>
							Forgot password?
						</ChakraLink>
					</Box>
				</chakra.form>
			</FormProvider>
		</>
	);
};

const SignInError = ({ error }) => {
	const errorMsg = errors[error] ?? errors.default;
	return (
		<Box bg="red.50" border="1px" borderColor="red.200" rounded="md" p="4" mt="4">
			<Text fontSize="xs" color="red.500" mb="2">
				{errorMsg}
			</Text>
		</Box>
	);
};
Login.getLayout = (c) => <AuthLayout>{c}</AuthLayout>;

export default Login;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
	const { authenticated, redirectTo } = await authProvider.check(context);

	const session = await getServerSession(context.req, context.res, nextAuthOptions);

	const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);

	const user = session?.user;

	// we first check if we've a user object and then if its empty
	if (user && Object.keys(user).length > 0) {
		return {
			props: {
				...translateProps,
			},
			redirect: {
				destination: "/dashboard",
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

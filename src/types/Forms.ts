export interface LoginFormValues {
	phoneNo: string;
	password: string;
}

export interface ForgotPasswordFormValues {
	phoneNo: string;
}

export interface ResetPasswordFormValues {
	phoneNo: string;
	password: string;
	confirmPassword: string;
}
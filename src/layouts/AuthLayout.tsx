import { AppIcon } from "@/components/app-icon";
import { Box, BoxProps, Flex, useColorModeValue } from "@chakra-ui/react";
import { ThemedTitleV2 } from "@refinedev/chakra-ui";
import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

export const cardProps: BoxProps = {
	width: "400px",
	borderRadius: "12px",
	padding: "32px",
};

const AuthLayout: FC<IProps> = ({ children }) => {
	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} w={"full"}>
			<Box {...cardProps}>
				<Box mb={"4"}>
					<ThemedTitleV2 collapsed={false} text={"Antugrow"} icon={<AppIcon />} />
				</Box>
				<Box bg={"chakra-body-bg"} borderWidth={"1px"} borderColor={useColorModeValue("gray.200", "gray.700")} backgroundColor={useColorModeValue("white", "gray.800")} {...cardProps}>
					{children}
				</Box>
			</Box>
		</Flex>
	);
};

export default AuthLayout;

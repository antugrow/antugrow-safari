import { AppIcon } from "@/components/app-icon";
import CustomThemedLayoutTitle from "@/components/custom-themed-layout-title";
import { Header } from "@/components/header";
import SystemAdminSider from "@/components/sidebar/MainSideBar";
import { Box } from "@chakra-ui/react";
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";
import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode | ReactNode[];
}

const MainLayout: FC<IProps> = ({ children }) => {
	return (
		<ThemedLayoutV2 Header={() => <Header sticky />} Title={({ collapsed }) => <CustomThemedLayoutTitle collapsed={collapsed} text={"Antugrow"} icon={<AppIcon />} />} Sider={() => <SystemAdminSider />}>
			<Box pt={{ base: "20px", md: "50px", xl: "20px" }} px={"30px"} w={"full"} fontFamily={"Nunito"}>
				{children}
			</Box>
		</ThemedLayoutV2>
	);
};

export default MainLayout;

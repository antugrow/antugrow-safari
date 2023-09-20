import { Box } from "@chakra-ui/react";
import { ThemedSiderV2, ThemedTitleV2, useThemedLayoutContext } from "@refinedev/chakra-ui";
import { FiHome } from "react-icons/fi";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { RiChatHistoryLine } from "react-icons/ri";
import { AppIcon } from "../app-icon";
import { FaUsersLine } from "react-icons/fa6";
import SideItem from "./SideItem";
import useDidHydrate from "@/hooks/useDidHydrate";
import { UserType } from "@/types/User";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { GiStoneStack } from "react-icons/gi";
import { GoStack } from "react-icons/go";

const MainSideBar = () => {
	const { siderCollapsed } = useThemedLayoutContext();

	const { data, status } = useSession();
	const { didHydrate } = useDidHydrate();

	const user = useMemo(() => {
		if (!didHydrate || status === "loading") {
			return null;
		}

		return data?.user;
	}, [data, status]);

	return (
		<ThemedSiderV2
			Title={() => <ThemedTitleV2 collapsed={siderCollapsed} text={"Antugrow"} icon={<AppIcon />} />}
			render={({ items: _items, logout, collapsed: _collasped }) => (
				<Box w={"full"} pb={"24"} fontFamily={"Nunito"}>
					<SideItem icon={FiHome} path="admin/dashboard" text="Dashboard" />

					<SideItem path="admin/coops" text="Cooperatives" icon={BiBuildings} />

					<SideItem path="admin/products" text="Products" icon={GiStoneStack} />

					<SideItem path="admin/collections" text="Collections" icon={GoStack} />

					<SideItem path="admin/users" text="Users" icon={FaUsersLine} />

					<SideItem path="admin/farmers" text="Farmers" icon={FaUsersLine} />

				</Box>
			)}
		/>
	);
};

export default MainSideBar;

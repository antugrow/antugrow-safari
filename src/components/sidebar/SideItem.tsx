import { FlexProps, Flex, useColorModeValue, Icon, TooltipProps, Text, Tooltip } from "@chakra-ui/react";
import { useThemedLayoutContext } from "@refinedev/chakra-ui";
import { useLink } from "@refinedev/core";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { IconType } from "react-icons";

interface SideItemProps extends FlexProps {
	path?: string;
	icon?: IconType;
	text: string;
	isActions?: boolean;
	currUserRole?: string;
}

const NewSideItem = ({ path, icon, text, isActions = false, currUserRole, ...rest }: SideItemProps) => {
	const Link = useLink();
	const router = useRouter();

	const selected = useMemo(() => {
		if (path && router.pathname !== "/") {
			return router.pathname === `/${path}` ? true : false;
		}

		return false;
	}, [path, router.pathname]);

	const { siderCollapsed: collapsed } = useThemedLayoutContext();

	const commonTooltipProps: Omit<TooltipProps, "children"> = {
		placement: "right",
		hasArrow: true,
		isDisabled: !collapsed,
		// shouldWrapChildren: true,
	};

	return (
		<Tooltip label={text} {...commonTooltipProps}>
			<Link to={path ? `/${path}` : "/"}>
				<Flex
					align="center"
					p="4"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					_hover={{
						bg: useColorModeValue("gray.100", "gray.700"),
					}}
					fontSize={"xs"}
					bg={useColorModeValue(selected ? "brand.400" : "white", selected ? "brand.400" : "gray.800")}
					w={"full"}
					{...rest}>
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={
							collapsed
								? {
										color: "white",
								  }
								: {
										color: "brand.400",
								  }
						}
						as={icon}
						color={useColorModeValue(selected ? "white" : collapsed ? "gray.600" : "gray.600", selected ? "white" : collapsed ? "gray.400" : "gray.400")}
					/>

					{!collapsed && <Text color={useColorModeValue(selected ? "white" : collapsed ? "gray.600" : "gray.600", selected ? "white" : collapsed ? "gray.400" : "gray.400")}>{text}</Text>}
				</Flex>
			</Link>
		</Tooltip>
	);
};

export default NewSideItem;

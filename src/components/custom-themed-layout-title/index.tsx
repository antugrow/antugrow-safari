import { useLink, useRouterContext, useRouterType } from "@refinedev/core";
import {
  Link as ChakraLink,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { JSX } from "react";

interface IProps {
  collapsed?: boolean;
  text?: string;
  icon?: JSX.Element;
}

const CustomThemedLayoutTitle = ({ collapsed, text, icon }: IProps) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  return (
    <ChakraLink as={routerType === "legacy" ? LegacyLink : Link} to="/">
      <HStack
        spacing="8px"
        justifyContent="center"
        alignItems="center"
        fontSize="inherit"
      >
        <Icon height="24px" width="24px" color="brand.500">
          {icon}
        </Icon>

        {!collapsed && (
          <Heading
            as="h6"
            fontWeight={700}
            fontSize="inherit"
            color={useColorModeValue("brand.500", "white")}
          >
            {text}
          </Heading>
        )}
      </HStack>
    </ChakraLink>
  );
};

export default CustomThemedLayoutTitle;

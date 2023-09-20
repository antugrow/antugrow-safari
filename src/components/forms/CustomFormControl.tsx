// imports
import { NOOP } from "@/helpers";
import { ICustomFormControl, IOption } from "@/types/FormControl";
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  PinInput,
  PinInputField,
  PinInputProps,
  Radio,
  RadioGroup,
  Select,
  SelectProps,
  Switch,
  Text,
  Textarea,
  TextareaProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
/**
 * Custom React Input Type component with variants such as input, select and textarea
 * By default the variant="input"
 * @example
 * ```ts
 * <CustomFormControl label="Name" placeholder="John Mwangi" />
 * ```
 *
 * @example using react-hook-form
 * ```ts
 * <CustomFormControl name="name" label="Name" placeholder="John Mwangi" register={register} />
 * ```
 */

const CustomFormControl: FC<
  ICustomFormControl &
    InputProps &
    SelectProps &
    TextareaProps &
    Pick<PinInputProps, "onChange" | "onComplete" | "value">
> = ({
  name,
  error,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  variant = "input",
  options,
  isDisabled = false,
  isRequired = false,
  isReadOnly,
  disabledOptions,
  setValue = NOOP,
  showLabel = true,
  register = NOOP,
  isInvalid,
  helperText,
  defaultValue,
}) => {
  const [show, setShow] = useState(false);
  const handlePasswordInput = () => setShow(!show);
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const getOptionItem = useCallback((item: (typeof options)[0]) => {
    const isValue = typeof item === "string";

    const v = isValue ? item : item?.value;
    const l = isValue ? item : item?.label ?? item?.value;

    return { value: v, label: l };
  }, []);

  return (
    <FormControl
      px={2}
      py={3}
      colorScheme="brand"
      isInvalid={!!error?.message || isInvalid}
    >
      {showLabel && (
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="xs"
          fontWeight="500"
          color={textColor}
          alignItems={"center"}
        >
          {label}{" "}
          {isRequired && (
            <Text color={brandStars} ml={2}>
              *
            </Text>
          )}
        </FormLabel>
      )}
      {variant === "input" && (
        <InputGroup>
          <Input
            type={type === "password" ? (show ? "text" : "password") : type}
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              !onChange && !setValue
                ? () => {}
                : onChange
                ? onChange(e)
                : setValue
                ? setValue(e.target.value)
                : () => {}
            }
            fontSize={"xs"}
            disabled={isDisabled}
            rounded={"2xl"}
            color={textColor}
            _focus={{
              borderColor: "brand.400",
            }}
            {...register(name, { required: isRequired })}
          />
          {type === "password" && (
            <InputRightElement display="flex" alignItems="center">
              <Icon
                color="gray.600"
                _hover={{ cursor: "pointer" }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handlePasswordInput}
              />
            </InputRightElement>
          )}
        </InputGroup>
      )}

      {variant === "select" && (
        <Select
          size="md"
          placeholder={placeholder ?? "Choose ..."}
          disabled={isDisabled}
          value={value}
          fontSize={"xs"}
          onChange={(e) => (onChange ? onChange(e) : setValue(e.target.value))}
          {...register(name)}
          isRequired={isRequired}
        >
          {options?.map((opt) => {
            const item = getOptionItem(opt);
            if (!item.value) return null;
            return (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            );
          })}
        </Select>
      )}

      {variant === "checkbox" && (
        <CheckboxGroup
          value={value as unknown as (string | number)[]}
          onChange={setValue}
        >
          <Flex gap="4" direction="row" wrap="wrap">
            {options?.map((opt) => {
              const item = getOptionItem(opt);

              return (
                <Checkbox
                  colorScheme="purple"
                  key={item.value}
                  value={item.value}
                  disabled={
                    disabledOptions?.includes(item.value as string) ||
                    isDisabled
                  }
                  readOnly={isReadOnly}
                  size={"sm"}
                >
                  {item.label}
                </Checkbox>
              );
            })}
          </Flex>
        </CheckboxGroup>
      )}

      {variant === "textarea" && (
        <Textarea
          fontSize={"xs"}
          disabled={isDisabled}
          rounded={"2xl"}
          color={textColor}
          placeholder={placeholder}
          rows={4}
          onChange={(e) =>
            !onChange && !setValue
              ? () => {}
              : onChange
              ? onChange(e)
              : setValue
              ? setValue(e.target.value)
              : () => {}
          }
          {...register(name, { required: isRequired })}
        />
      )}

      {variant === "otp" && (
        <HStack>
          <PinInput
            otp
            size={"lg"}
            value={value as string}
            onChange={(val) => setValue(val)}
            onComplete={(val) => setValue(val)}
            type="number"
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      )}

      {variant === "switch" && (
        <Switch
          size="lg"
          colorScheme="brand"
          isChecked={value as unknown as boolean}
          onChange={(e) => setValue(e.target.checked)}
          {...register(name)}
        />
      )}

      {variant === "radio" && (
        <RadioGroup
          value={value as string}
          onChange={setValue}
          isDisabled={isDisabled}
          colorScheme="primary"
          size={"sm"}
        >
          <Flex gap="3" direction={"row"} wrap="wrap">
            {options?.map((opt) => {
              const item = getOptionItem(opt);
              return (
                <Radio
                  key={item.value}
                  value={item.value as string}
                  // @ts-ignore
                  disabled={disabledOptions?.includes(item.value) || isDisabled}
                  readOnly={isReadOnly}
                >
                  {item.label}
                </Radio>
              );
            })}
          </Flex>
        </RadioGroup>
      )}
      {!error?.message && helperText && (
        <FormHelperText fontSize={"xs"}>{helperText}</FormHelperText>
      )}
      <FormErrorMessage fontSize={"xs"}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomFormControl;

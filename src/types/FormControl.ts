import React, { ReactNode } from "react";
import { ActionMeta } from "react-select";
import { UseFormRegister, FieldError } from "react-hook-form";

export interface IOption {
  value?: string | number;
  label: string;
}

export interface ICustomFormControl {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
  value?: string | number | any;
  setValue?: (value: string | any) => void;
  variant?: "input" | "select" | "textarea" | "checkbox" | "otp" | "switch" | "radio"
  options?: (string | IOption)[];
  addRightLeftElement?: boolean;
  rightElementText?: string;
  rightElementLink?: string;
  rightElement?: ReactNode;
  onClickRightElement?: () => {};
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  isRequired?: boolean;
  disabledOptions?: (string | IOption)[];
  showLabel?: boolean;
  register?: UseFormRegister<any>;
  error?: FieldError;
  helperText?: string;
}

export interface CustomFormMultiSelectProps {
  as?: any;
  colSpan?: any;
  label: string;
  placeholder: string;
  options: IOption[];
  onChange?: (value: string[], action: ActionMeta<any>) => void;
  formLabel: string;
  value?: any;
  defaultValue?: any;
}

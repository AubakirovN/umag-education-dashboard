import type { GroupBase } from "react-select";
import Creatable from "react-select/creatable";
import type { CreatableProps } from "react-select/creatable";
import { withAsyncPaginate } from "react-select-async-paginate";
import type {
  UseAsyncPaginateParams,
  ComponentProps
} from "react-select-async-paginate";

import { Text, createStyles } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ReactElement } from "react";

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable
) as AsyncPaginateCreatableType;

const useStyles = createStyles(() => ({
  asterisk: {
    color: "#fa5252",
  },
  text: {
    fontSize: "14px",
    fontWeight: 500,
  },
  errorText: {
    color: "#fa5252",
    fontSize: "12px",
  },
}));
interface CreatableAsyncSelectProps {
  loadOptions: () => Promise<any>;
  w?: string | number;
  mah?: string | number;
  withAsterisk?: boolean;
  search: string;
  inputValue?: string;
  onChange: any;
  isClearable?: boolean;
  onCreateOption: any;
  handleSearchChange: any;
  placeholder: string;
  error?: any;
  label?: string;
  isMulti?: boolean;
  value?: any;
  cacheUniqs?: any[];
}

export const CreatableAsyncSelect = ({
  w,
  mah,
  error,
  placeholder,
  withAsterisk,
  search,
  value,
  isClearable,
  label,
  inputValue,
  onCreateOption,
  onChange,
  isMulti,
  loadOptions,
  handleSearchChange,
  cacheUniqs
}: CreatableAsyncSelectProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const customStyles = {
    menuList: (base: any) => ({
      ...base,
      maxHeight: mah ? mah : "120px",
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 205
    }),
    control: (provided: any) => ({
      ...provided,
      width: w ? w : '250px',
      border: !error ? "1px solid #ccc" : "1px solid #fa5252",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: !error ? "#ccc" : "#fa5252",
      fontSize: "14px",
    }),
  };
  return (
    <>
      <Text className={classes.text}>
        {label}
        {withAsterisk && <span className={classes.asterisk}> *</span>}
      </Text>
      <CreatableAsyncPaginate
        isClearable={isClearable || false}
        formatCreateLabel={(inputValue) => `${t("form.validate.create")} ${inputValue}`}
        value={value}
        isMulti={isMulti}
        noOptionsMessage={() => t("form.validate.noOptions")}
        placeholder={placeholder}
        cacheUniqs={[search, ...(cacheUniqs ?? [])]}
        onCreateOption={onCreateOption}
        debounceTimeout={300}
        onChange={onChange}
        styles={customStyles}
        loadOptions={loadOptions}
        inputValue={inputValue}
        onInputChange={handleSearchChange}
      />
      {error && <Text className={classes.errorText}>{error}</Text>}
    </>
  );
};

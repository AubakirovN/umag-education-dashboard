// import { getColorsByIndex } from "@/core/utils/getColors";
import { Text, createStyles } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";

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
interface AsyncSelectProps {
  loadOptions: () => Promise<any>;
  w?: string | number;
  mah?: string | number;
  withAsterisk?: boolean;
  search?: string;
  onChange?: any;
  isClearable?: boolean;
  handleSearchChange?: any;
  inputValue?: string;
  placeholder: string;
  error?: any;
  label?: string;
  isMulti?: boolean;
  value?: any;
  cacheUniqs?: any[];
  // colored?: boolean;
  disabled?: boolean;
}

export const AsyncSelect = ({
  w,
  mah,
  error,
  placeholder,
  withAsterisk,
  search,
  value,
  isClearable,
  inputValue,
  label,
  onChange,
  isMulti,
  // colored,
  disabled,
  loadOptions,
  handleSearchChange,
  cacheUniqs,
}: AsyncSelectProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const customStyles = {
    menuList: (base: any) => ({
      ...base,
      maxHeight: mah ? mah : "120px",
    }),
    menu: (base: any) => ({
      ...base,
      width: w ? w : "250px",
      zIndex: 205,
    }),
    // multiValue: (base: any, { index }: { index: number }) => ({
    //   ...base,
    //   backgroundColor: colored ? getColorsByIndex(index) : "#ccc",
    // }),
    control: (provided: any) => ({
      ...provided,
      width: w ? w : "250px",
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
      <AsyncPaginate
        value={value}
        isMulti={isMulti}
        isDisabled={disabled}
        noOptionsMessage={() => t("form.validate.noOptions")}
        placeholder={placeholder}
        cacheUniqs={[search, ...(cacheUniqs ?? [])]}
        debounceTimeout={300}
        onChange={onChange}
        styles={customStyles}
        inputValue={inputValue}
        loadOptions={loadOptions}
        onInputChange={handleSearchChange}
        isClearable={isClearable || false}
      />
      {error && <Text className={classes.errorText}>{error}</Text>}
    </>
  );
};

import Select from 'react-select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Option = string | Record<string, any>;

interface BaseTypeAheadInputProps {
  labelKey: string,
  valueKey: string
  isMulti: boolean;
  options: Option[];
  onChange: (selected: Option[]) => void;
  [x: string | number | symbol]: unknown;
}

const BaseTypeAheadInput = ({
  labelKey,
  valueKey,
  options,
  isMulti,
  onChange
}: BaseTypeAheadInputProps): JSX.Element => {
  const handleOnChange = (e) => {
    console.log('typeahead change: ', e);
    onChange(e)
  }
  // TODO: determine if forwardRef needed for react hook form
  return (
    <Select
      getOptionLabel={options => options[labelKey]}
      getOptionValue={options => options[valueKey]}
      closeMenuOnSelect={false}
      defaultValue={[options[0]]}
      isMulti={isMulti}
      onChange={handleOnChange}
      options={options}
  />
  )
}

export default BaseTypeAheadInput
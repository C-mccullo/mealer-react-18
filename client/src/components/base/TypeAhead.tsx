import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Option = string | Record<string, any>;

interface BaseTypeAheadInputProps {
  labelKey: string;
  options: Option[];
  onChange: (selected: Option[]) => void;
  [x: string | number | symbol]: unknown;
}

const BaseTypeAheadInput = ({
  labelKey,
  options,
  onChange,
  ...props
}: BaseTypeAheadInputProps): JSX.Element => {
  return (
    <Typeahead
      {...props}
      labelKey={labelKey}
      options={options}
      onChange={onChange}/>
  )
}

export default BaseTypeAheadInput
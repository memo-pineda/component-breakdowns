import { FC, ReactElement } from 'react';

interface FormProps {
  onSubmit?: () => void;
}

const Form: FC<FormProps> = ({ onSubmit }): ReactElement => {
  
  return <form>
    <input />
  </form>
}

export default Form;

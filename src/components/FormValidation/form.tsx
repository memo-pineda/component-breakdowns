import { ChangeEvent, FC, ReactElement, useState } from 'react';

/**
 * Build a Form component that will detect when inputs
 * 1. have the same value
 * 2. Lenth is less than 5
 * 
 * Consider ways to also extend the validation abilities
 */

interface FormProps {
  onSubmit?: () => void;
}

const Form: FC<FormProps> = ({ onSubmit }): ReactElement => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [errors, setErrors] = useState<Record<string, { hasDuplicate?: boolean, tooShort?: boolean}>>({});

  const handleErrors = ({ type, result }: { type: string, result: string }) => {
    const form = document.getElementById("form");
    if (form instanceof HTMLFormElement) {
      const entries = new FormData(form).entries();
      const localErrors = {...errors}
      for (const [name, value] of entries) {
        // Checks for duplicate values
        if (result === value && type !== name) {
          localErrors[name] = {
            hasDuplicate: true,
          }
          // if the updated value has one duplicate, then we can update it accordingly to have a duplicate
          localErrors[type] = {
            hasDuplicate: true,
          }
        }

        if (value.toString().length < 5) {
          localErrors[name] = {
            tooShort: true
          }
        }
      }

      setErrors(localErrors);
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const result = e.target.value;
    switch (type) {
      case 'input1':
        setInput1(result);
        break;
      case 'input2':
        setInput2(result);
        break;
      case 'input3':
        setInput3(result);
        break;
    }

    handleErrors({ type, result });
  }

  return <form className="flex flex-column" id="form">
    <input value={input1} onChange={(e) => handleInputChange(e, 'input1')} name="input1" />
    {errors?.['input1']?.hasDuplicate && <span>Duplicate values</span>}
    <input value={input2} onChange={(e) => handleInputChange(e, 'input2')} name="input2" />
    {errors?.['input2']?.hasDuplicate && <span>Duplicate values</span>}
    <input value={input3} onChange={(e) => handleInputChange(e, 'input3')} name="input3" />
    {errors?.['input3']?.hasDuplicate && <span>Duplicate values</span>}
  </form>
}

export default Form;

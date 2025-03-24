import React from 'react';
import '../../styles/organisms/form.scss';
import FormField from '../molecules/FormField';
import ButtonGroup from '../molecules/ButtonGroup';

const Form = ({
  fields = [],
  onSubmit,
  submitButton = { children: 'Submit', type: 'submit' },
  cancelButton = { children: 'Cancel', type: 'button' },
  className = '',
  showCancel = true
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const buttons = [submitButton];
  if (showCancel) {
    buttons.push(cancelButton);
  }

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <FormField key={field.name || index} {...field} />
      ))}
      <ButtonGroup buttons={buttons} />
    </form>
  );
};

export default Form; 
import React from 'react';
import styled from 'styled-components/macro';

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  border: 1px solid rgb(148, 148, 148);
  border-radius: 8px;
  margin-top: 0.5rem;
  padding: 0.75rem;
`;

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, type, value, onChange }: InputProps) {
  return (
    <Label>
      <span>{label}</span>
      <InputField type={type} value={value} onChange={onChange} />
    </Label>
  );
}

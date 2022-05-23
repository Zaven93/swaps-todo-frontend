import React from "react";

export interface PasswrordFormControlType {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  comparePassword?: string | null;
  renderError: (field: string) => JSX.Element | undefined;
  isInvalid: boolean;
  onFocus: () => void;
}

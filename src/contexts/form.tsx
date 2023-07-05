import { FormEvent, createContext, useContext, useState } from "react";

type FormContextData = {
  values: Record<string, string>
  setValue: (name: string, value: string) => void;
  getValue: (name: string) => string;
  handleSubmit: (e: FormEvent) => void
}

const FormContext = createContext({} as FormContextData)

export function FormProvider({ children, onSubmit }: React.PropsWithChildren<{onSubmit: (values: Record<string, string>) => void}>) {
  const [values, setValues] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  const setValue = (name: string, value: string) => {
    setValues(state => ({...state, [name]: value}))
  }

  const getValue = (name: string) => {
    return values[name] ?? ""
  }

  return <FormContext.Provider value={{values, setValue, getValue, handleSubmit }}>{children}</FormContext.Provider>
}


type FormRootProps = React.PropsWithChildren<{
  onSubmit: (values: Record<string, string>) => void
}>

function FormElement({children}: React.PropsWithChildren<any>) {
  const {handleSubmit} = useContext(FormContext)

  return <form onSubmit={handleSubmit}>{children}</form>
}

function FormRoot({children, onSubmit}: FormRootProps) {
  return <FormProvider onSubmit={onSubmit}><FormElement>{children}</FormElement></FormProvider>
}

type FormInputProps = {
  name: string
}

function FormInput({name}: FormInputProps) {
  const { getValue, setValue } = useContext(FormContext)

  return <input type="text" name={name} value={getValue(name)} onChange={e => setValue(name, e.target.value)} />
}

export const Form = {
  Root: FormRoot,
  Input: FormInput
}

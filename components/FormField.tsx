type FormParams = {
    type?: string,
    title: string,
    state: string,
    placeholder: string,
    isTextArea?: boolean,
    setState: (value: string) => void
}

const FormField = ({
    type, title, state, placeholder, isTextArea, setState
}: FormParams) => {
  return (
    <div>
        FormField
    </div>
  )
}

export default FormField

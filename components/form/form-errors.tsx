interface FormErrorsProps {
    id: string
    errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
    if (!errors) {
        return null
    }

    return (
        <>
            {errors?.[id]?.map((error: string) => (
                <span
                    key={error}
                    id={`${id}-error`}
                    className='text-xs text-rose-500'
                    aria-live='polite'
                >
                    {error}
                </span>
            ))}
        </>
    )
}

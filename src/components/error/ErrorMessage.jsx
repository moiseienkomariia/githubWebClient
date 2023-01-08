const ErrorMessage = ({message}) => {
    console.log(message)
    return (
        <>
            This is error
            <div>{message}</div>
        </>
    )
}

export default ErrorMessage;
type NotificationProps = {
    message: String | null
}

const Notification = ({ message }: NotificationProps) => {
    
    if (message === null){
        return null
    }

    return(
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {message}
        </div>
    )
}

export default Notification
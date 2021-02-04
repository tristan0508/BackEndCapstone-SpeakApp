const groupMessagesByDate = (messageList) => {
    const sortedMessages = messageList.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
    return Object.entries(sortedMessages.reduce((messages, message) => {
        if(!message.date || !message.body){
            return false
        }
        const date = message.date;
        messages[date] = messages[date] ? [...messages[date], message] : [message];
        return messages
    }, {}))
}

export default groupMessagesByDate;

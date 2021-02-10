const groupMessagesByDate = (messageList) => {
    const sortedMessages = messageList.sort(
        (a, b) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated)
    )
    return Object.entries(sortedMessages.reduce((messages, message) => {
        if(!message.dateCreated || !message.body){
            return false
        }
        let date = message.dateCreated;
        console.log(messages)
        console.log(message)
        date = new Date(date).toLocaleString().split(',')[0]
        messages[date] = messages[date] ? [...messages[date], message] : [message];
        return messages
    }, {}))
}

export default groupMessagesByDate;

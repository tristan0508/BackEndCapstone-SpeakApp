import React, { useEffect, useContext, useCallback } from 'react';
import { Container, ListItem } from '@material-ui/core';
import AvatarStatus from '../customcomponents/AvatarStatus';
import { UserContext, ChatContext, ChatHubContext } from '../../providers/ContextProvider';




export const UserList = () => {
    const { GetAllUsers, allUsers, userOnline, AddChat, setOpenModal, GetUserChat } = useContext(ChatContext)
    const { displayName, userImage } = useContext(UserContext);
    const { DirectChat } = useContext(ChatHubContext)

    useEffect(() => {
        GetAllUsers()
    }, [])

    const handleReceiver = (first, last, image) => {
     

        const Chat = {
            name: displayName,
            type: "Direct Message",
            sender: displayName,
            receiver: `${first} ${last}`,
            senderImage: userImage,
            receiverImage: image ? image : null
        }

        DirectChat(Chat)
        .then(() => GetUserChat())
        setOpenModal(false)
    }

    return (

        <ListItem className="userListContainer" style={{ marginTop: '5px',borderRadius: '5px'}}>
           { allUsers.map(u => {
                return <div key={u.id} className="userList">
                        <AvatarStatus src={u.image} online={userOnline} />
                            <Container style={{ marginTop: '7px', paddingLeft: '10px'}} >
                                <button 
                                 onClick={() => 
                                    handleReceiver(
                                        u.firstName,
                                        u.lastName,
                                        u.image
                                    )} 
                                 className="userListBtn">
                                    {u.firstName} {u.lastName} # {u.displayName}
                                </button>
                            </Container>
                        </div>

            })}
        </ListItem>
    )
}
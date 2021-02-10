import React, { useEffect, useContext } from 'react';
import { Container, ListItem } from '@material-ui/core';
import AvatarStatus from '../customcomponents/AvatarStatus';
import { UserContext, ChatContext, ChatHubContext } from '../../providers/ContextProvider';




export const UserList = ({filteredUsers}) => {
    const { GetAllUsers, userOnline, setOpenModal, GetUserChat } = useContext(ChatContext)
    const { displayName, userImage } = useContext(UserContext);
    const { AddChat } = useContext(ChatHubContext)

    useEffect(() => {
        GetAllUsers()
    }, [])

    const handleReceiver = (first, last, image, email) => {
        const Chat = {
            type: "Direct Message",
            sender: displayName,
            receiver: `${first} ${last}`,
            senderImage: userImage,
            receiverImage: image ? image : null,
            receiverEmail: email
        }

        AddChat(Chat)
        .then(() => GetUserChat())
        setOpenModal(false)
    }

    return (

        <ListItem className="userListContainer" style={{ marginTop: '5px',borderRadius: '5px'}}>
           { filteredUsers.map(u => {
                return <div key={u.id} className="userList">
                        <AvatarStatus src={u.image} online={userOnline} />
                            <Container style={{ marginTop: '7px', paddingLeft: '10px'}} >
                                <button 
                                 onClick={() => 
                                    handleReceiver(
                                        u.firstName,
                                        u.lastName,
                                        u.image,
                                        u.email
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
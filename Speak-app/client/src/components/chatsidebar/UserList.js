import React, { useEffect, useContext } from 'react';
import { ChatContext } from '../../providers/ChatProvider';
import { Container, ListItem } from '@material-ui/core';
import AvatarStatus from '../customcomponents/AvatarStatus';
import { ChatHubContext } from '../../providers/ChatHubProvider';
import UserContext from '../../providers/UserContext';




export const UserList = () => {
    const { GetAllUsers, allUsers, userOnline, AddChat } = useContext(ChatContext)
    const { displayName, userImage } = useContext(UserContext);
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

        AddChat(Chat)
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
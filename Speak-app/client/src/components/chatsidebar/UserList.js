import React, { useEffect, useContext } from 'react';
import { ChatContext } from '../../providers/ChatProvider';
import { Container, ListItem } from '@material-ui/core';
import AvatarStatus from '../customcomponents/AvartarStatus';
import { ChatHubContext } from '../../providers/ChatHubProvider';



export const UserList = () => {
    const { GetAllUsers, allUsers, userOnline } = useContext(ChatContext)
    const { setReceiverId, setReceiverFirebaseId, setReceiverName } = useContext(ChatHubContext)
    useEffect(() => {
        GetAllUsers()
    }, [])

    const handleReceiver = (firebaseId, receiverId, first, last) => {
        setReceiverFirebaseId(firebaseId)
        setReceiverId(receiverId)
        setReceiverName(`${first} ${last}`)
        
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
                                        u.firebaseUserId,
                                        u.id,
                                        u.firstName,
                                        u.lastName
                                    )} 
                                 className="userListBtn">
                                    {u.firstName}
                                    {u.lastName} #
                                    {u.displayName}
                                </button>
                            </Container>
                        </div>

            })}
        </ListItem>
    )
}
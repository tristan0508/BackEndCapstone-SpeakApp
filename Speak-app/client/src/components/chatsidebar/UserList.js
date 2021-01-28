import React, { useEffect, useContext } from 'react';
import { ChatContext } from '../../providers/ChatProvider';
import { Container, ListItem } from '@material-ui/core';
import AvatarStatus from '../customcomponents/AvartarStatus';



export const UserList = () => {
    const { GetAllUsers, allUsers, userOnline, setUserOnline } = useContext(ChatContext)

    useEffect(() => {
        GetAllUsers()
    }, [])

    const handleOnline = (e) => {
        if (userOnline === false) {
            setUserOnline(true)
        } else {
            setUserOnline(false)
        }
        console.log(e.currentTarget.id)
    }

    return (

        <ListItem className="userListContainer" style={{ marginTop: '5px',borderRadius: '5px'}}>
           { allUsers.map(u => {
                return <div key={u.id} className="userList">
                        <AvatarStatus src={u.image} online={userOnline} />
                            <Container style={{ marginTop: '7px', paddingLeft: '10px'}} >
                                <button id={u.firebaseUserId} onClick={handleOnline} className="userListBtn">{u.firstName} {u.lastName} # {u.displayName}</button>
                            </Container>
                        </div>

            })}
        </ListItem>
    )
}
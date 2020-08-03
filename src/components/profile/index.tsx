import React from 'react';

type profileProps = {
    username: string;
    name: string;
};

const Profile = ({ username, name }: profileProps) => {
    return (
        <div id="profile">
            <div>username: {username}</div>
            <div>name: {name}</div>
        </div>
    );
};

export default Profile;

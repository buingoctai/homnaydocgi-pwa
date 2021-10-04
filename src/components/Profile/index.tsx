import React from 'react';
import './style.scss';
import Shimmer from './shimmer';

interface Props {
  avatarUrl: string;
  email: string | null;
  job: string | null;
}
const Profile = (props: Props) => {
  const { avatarUrl, email, job } = props;
  return (
    <div className="profile-container">
      <div className="avatar-wrap">
        <img src={avatarUrl} width="100%" height="100%" />
      </div>
      <Shimmer />
      <div className="description-wrap">
        {job && <span className="job">{job}</span>}
        {email && <span className="email">{email}</span>}
      </div>
    </div>
  );
};

export default Profile;

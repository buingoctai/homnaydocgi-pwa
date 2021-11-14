import React from 'react';
import Shimmer from './shimmer';
import IconDownload from 'srcRoot/static/svg/icon-download.svg';
import './style.scss';

interface Props {
  avatarUrl: string;
  email: string | null;
  job: string | null;
}
const Profile = (props: Props) => {
  const { avatarUrl, email, job } = props;

  function download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: 'https://docs.google.com/uc?export=download&id=1VCdXwwftJ-0QSESOXf5ibcsNz_Mjp65P',
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }
  return (
    <div className="profile-container">
      <div className="avatar-wrap">
        <img src={avatarUrl} width="100%" height="100%" />
      </div>
      <Shimmer />
      <div className="description-wrap">
        {job && <span className="job">{job}</span>}
        {email && <span className="email">{email}</span>}
        <div
          className="download__cv"
          onClick={() => {
            download();
          }}
        >
          <img src={IconDownload} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

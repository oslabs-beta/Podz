import React from 'react';
import GitHub from '../assets/github.png';
import Email from '../assets/email.png';
import LinkedIn from '../assets/linkedin.png';

const DeveloperIcon = ({ name, picture, github, email, linkedin }: any) => {
  return (
    <div className='developerIcon'>
      <img className='developerPic' src={picture} />
      <h3 className='developerName'>{name}</h3>
      <div className='logoList'>
        <a href={github}>
          <img className='developerLogo' src={GitHub} alt='github' />
        </a>
        <a href={email}>
          <img className='developerLogo' src={Email} alt='email' />
        </a>
        <a href={linkedin}>
          <img className='developerLogo' src={LinkedIn} alt='linkedin' />
        </a>
      </div>
    </div>
  );
};

export default DeveloperIcon;

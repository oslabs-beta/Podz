import React from 'react';
import DeveloperIcon from '../components/DeveloperIcon';
import { DeveloperType } from '../../types';

const TeamContainer = () => {
  const developerList: DeveloperType[] = [
    {
      name: 'Bin Zheng',
      picture:
        'https://media.licdn.com/dms/image/D4E03AQHqate1apey9g/profile-displayphoto-shrink_800_800/0/1704478821560?e=1710374400&v=beta&t=bJubhwLGxvjg_dT-gp2a36rZeLR_SP1M3WQZi6leyOQ',
      github: 'https://github.com/binzheng622',
      email: 'binzheng622@gmail.com',
      linkedin: 'https://www.linkedin.com/in/binzheng622/',
    },
    {
      name: 'Ezekiel Mohr',
      picture: 'NA',
      github: 'https://github.com/Ezmr7',
      email: 'ezekielmohr27@gmail.com',
      linkedin: 'NA',
    },
    {
      name: 'Jeffrey Mai',
      picture:
        'https://media.licdn.com/dms/image/D4E03AQF1Y73F4DfTVg/profile-displayphoto-shrink_800_800/0/1704901189065?e=1710374400&v=beta&t=KsY8Tbl2rrFMVdCQn7bE0V3Kk-_1TAHFwsv5BeiU1-8',
      github: 'https://github.com/jeffrey-mai',
      email: 'jeffreymai3000@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jeffrey-mai-fiv/',
    },
    {
      name: 'Philip Wang',
      picture:
        'https://media.licdn.com/dms/image/D4E03AQGirSN2OhW6AQ/profile-displayphoto-shrink_800_800/0/1668299725258?e=1710374400&v=beta&t=1nmqBdoNWTzcfZ1CCA58Q3rIRX7fwH9GHQBogWsbiy0',
      github: 'https://github.com/pwang10',
      email: 'pwang11@binghamton.edu',
      linkedin: 'https://www.linkedin.com/in/philipwang1/',
    },
  ];

  let developerIcons: JSX.Element[] = [];
  developerList.forEach((developer: DeveloperType) => {
    developerIcons.push(
      <DeveloperIcon
        name={developer.name}
        picture={developer.picture}
        github={developer.github}
        email={developer.email}
        linkedin={developer.linkedin}
      />
    );
  });

  return (
    <div id='teamContainer'>
      <h1>Team Behind Podz</h1>
      <div className='teamList'>{developerIcons}</div>
    </div>
  );
};

export default TeamContainer;

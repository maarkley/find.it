import React from 'react';
import ProfileBox from './ProfileBox'

export default class Header extends React.Component {

  render() {
    return <div className="header">
              <ProfileBox />
           </div>
  } 
}


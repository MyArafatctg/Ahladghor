import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
  return (
      <FacebookProvider appId="486120047120867" chatSupport>
        <CustomChat pageId="102257258511367" minimized={true}/>
      </FacebookProvider>
  )
}

export default FacebookMsg

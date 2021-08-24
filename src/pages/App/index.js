import React, { useEffect } from 'react';
import Article from 'srcRoot/pages/Article';
import InstallApp from 'srcRoot/pages/Install-app';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import './style.scss';


const App = () => {
  useEffect(() => {
    initServiceWorker();
  }, []);


  console.log('taibnlog render => App');
  return (
    <>
      <Article headArticle={getQueryStringValue('id')}/>
      <InstallApp />
    </>
  );
};

export default App;

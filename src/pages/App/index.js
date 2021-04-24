import React, { useEffect, useState, version, useContext } from 'react';
import { saveSubscription } from '../../services/Notification';

import './style.scss';
import Article from '../Article';
import Popover from 'srcRoot/pages/components/Popover';
import PopoverManager from 'srcRoot/pages/components/Popover/popover-manager';
import {getQueryStringValue,initServiceWorker,} from 'srcRoot/utils';
import {AppContext} from 'srcRoot/appContext';
import InitIntro from './intro';

import dbManager from 'srcRoot/core/databases/indexDB';

const App = () => {
  const [appState, dispatch] = useContext(AppContext);
  const {popover} = appState;

  useEffect(() => {
    PopoverManager.bindDispatch(dispatch);
    initServiceWorker();
    
    let deferredPrompt;
    const addBtn = document.getElementById('btn-add');
    addBtn.style.display = 'none';
    
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';
    
      addBtn.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });


    dbManager.getStoreList([{name:'Article',version:1.0},{name:'Audio',version:1.0}])
    .then((res)=>{
      console.log('dbManager res:',res);
    })
    .catch((err)=>{
      console.log('dbManager error:',res);

    });
      if (!localStorage.getItem('intro')) {
      PopoverManager.open(<InitIntro />, { width: '118px', padding: '0px 0px' });
      setTimeout(() => {
        PopoverManager.close();
      }, 18000);

      localStorage.setItem('intro', true);
    }
  }, []);


  return (
    <>
      <button id="btn-add" className="button-home">
        Add To Home Screen
      </button>
      <Article headArticle={getQueryStringValue('id')} />
      {popover.isOpen && (
        <Popover newStyle={popover.data?.style} child={popover.data?.child}/>
      )}
    </>

  );
};

export default App;

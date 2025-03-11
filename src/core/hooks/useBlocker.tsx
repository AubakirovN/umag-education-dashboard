import {useEffect} from 'react';
import {useBlocker as useReactRouterBlocker} from 'react-router-dom';

export const useBlocker = (shouldBlock: boolean, confirmationText = "У вас есть несохраненные данные. Вы уверены, что хотите покинуть эту страницу") => {
  const routerBlocker = useReactRouterBlocker(({currentLocation, nextLocation}) => {
    return shouldBlock && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (routerBlocker.state === 'blocked') {
      if (confirm(confirmationText)) {
        routerBlocker.proceed();
      } else {
        routerBlocker.reset();
      }
    } 
  }, [routerBlocker, shouldBlock]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldBlock) {
        event.preventDefault();
        event.returnValue = confirmationText;
        return confirmationText;
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldBlock]);
}


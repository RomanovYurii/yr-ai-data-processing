import React from 'react';
import { InteractiveMap } from '@components/InteractiveMap/InteractiveMap';
import { FloatingMenu } from '@components/FloatingMenu/FloatingMenu';
import { AcoContextProvider } from '@src/contexts';

function App() {
  return (
    <AcoContextProvider>
      <FloatingMenu />
      <InteractiveMap />
    </AcoContextProvider>
  );
}

export default App;

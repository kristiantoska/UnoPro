import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import GameScreen from './screens/GameScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <GameScreen />
      </SafeAreaView>
    </>
  );
};

export default App;

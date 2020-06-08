import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import io from 'socket.io-client';

import StartScreen from './screens/StartScreen';
import Lobby from './screens/Lobby';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [socket, setSocket] = React.useState();
  const [lobbyVisible, setLobbyVisible] = React.useState(false);
  const [gameVisible, setGameVisible] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState();

  React.useEffect(() => {
    const ioSocket = io('http://localhost:8000');
    setSocket(ioSocket);
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket.on('onLobbyCreated', data => {
        openLobby(data);
      });
    }
  }, [socket]);

  const createLobby = () => {
    socket.emit('createLobby', { name: 'aaron' });
  };

  const openLobby = roomData => {
    console.log(roomData);
    setRoomCode(roomData.room);
    setLobbyVisible(true);
  };

  const leaveLobby = () => {
    setLobbyVisible(false);
  };

  const startGame = () => {
    setLobbyVisible(false);
    setGameVisible(true);
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: '#000D27' }}>
        <StartScreen createLobby={createLobby} openLobby={openLobby} />

        <Modal isVisible={lobbyVisible}>
          <Lobby
            startGame={startGame}
            leaveLobby={leaveLobby}
            roomCode={roomCode}
          />
        </Modal>

        {!lobbyVisible && (
          <Modal style={{ margin: 0 }} isVisible={true}>
            <GameScreen />
          </Modal>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;

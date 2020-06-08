import React from 'react';
import { SafeAreaView, StatusBar, InteractionManager } from 'react-native';
import Modal from 'react-native-modal';
import io from 'socket.io-client';

import { setRandomSeed } from './utils';

import StartScreen from './screens/StartScreen';
import Lobby from './screens/Lobby';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [username, setUsername] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [room, setRoom] = React.useState();
  const [lobbyVisible, setLobbyVisible] = React.useState(false);
  const [gameVisible, setGameVisible] = React.useState(false);

  React.useEffect(() => {
    const ioSocket = io('http://localhost:8000');
    setSocket(ioSocket);
  }, []);

  const openLobby = React.useCallback(
    roomData => {
      setRoom(roomData);
      InteractionManager.runAfterInteractions(() => setLobbyVisible(true));
    },
    [setRoom, setLobbyVisible],
  );

  const updateLobby = roomData => {
    setRoom(roomData);
  };

  React.useEffect(() => {
    if (socket) {
      socket.on('onLobbyJoin', data => {
        openLobby(data.room);
      });

      socket.on('onLobbyUpdate', data => {
        updateLobby(data.room);
      });

      socket.on('onGameStart', data => {
        setRandomSeed(data.seed);
        setLobbyVisible(false);
        InteractionManager.runAfterInteractions(() => setGameVisible(true));
      });
    }
  }, [socket, openLobby]);

  const createLobby = () => {
    socket.emit('createLobby', { name: username });
  };

  const joinLobby = code => {
    socket.emit('joinLobby', { name: username, roomId: code });
  };

  const leaveLobby = () => {
    setLobbyVisible(false);
  };

  const startGame = () => {
    setLobbyVisible(false);
    socket.emit('startGame', { roomId: room.roomId });
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: '#000D27' }}>
        <StartScreen
          username={username}
          setUsername={setUsername}
          createLobby={createLobby}
          joinLobby={joinLobby}
        />

        <Modal isVisible={lobbyVisible}>
          <Lobby
            startGame={startGame}
            leaveLobby={leaveLobby}
            room={room}
            username={username}
          />
        </Modal>

        <Modal
          style={{ margin: 0 }}
          isVisible={gameVisible}
          hasBackdrop={false}
        >
          <GameScreen room={room} username={username} socket={socket} />
        </Modal>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;

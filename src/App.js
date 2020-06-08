import React from 'react';
import { SafeAreaView, StatusBar, InteractionManager } from 'react-native';
import Modal from 'react-native-modal';
import io from 'socket.io-client';

import StartScreen from './screens/StartScreen';
import Lobby from './screens/Lobby';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [username, setUsername] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [players, setPlayers] = React.useState([]);
  const [lobbyVisible, setLobbyVisible] = React.useState(false);
  const [gameVisible, setGameVisible] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState();

  React.useEffect(() => {
    const ioSocket = io('http://localhost:8000');
    setSocket(ioSocket);
  }, []);

  const openLobby = React.useCallback(
    roomData => {
      setRoomCode(roomData.roomId);
      setPlayers(roomData.players);
      InteractionManager.runAfterInteractions(() => setLobbyVisible(true));
    },
    [setRoomCode, setPlayers, setLobbyVisible],
  );

  const updateLobby = roomData => {
    setPlayers(roomData.players);
  };

  React.useEffect(() => {
    if (socket) {
      socket.on('onLobbyJoin', data => {
        openLobby(data.room);
      });

      socket.on('onLobbyUpdate', data => {
        updateLobby(data.room);
      });
    }
  }, [socket, openLobby]);

  const createLobby = () => {
    socket.emit('createLobby', { name: username });
  };

  const joinLobby = code => {
    socket.emit('joinLobby', { name: username, roomId: Number(code) });
  };

  const leaveLobby = () => {
    setLobbyVisible(false);
  };

  const startGame = () => {
    setLobbyVisible(false);
    InteractionManager.runAfterInteractions(() => setGameVisible(true));
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

        <Modal isVisible={lobbyVisible} useNativeDriver>
          <Lobby
            startGame={startGame}
            leaveLobby={leaveLobby}
            roomCode={roomCode}
            players={players}
          />
        </Modal>

        <Modal
          style={{ margin: 0 }}
          isVisible={gameVisible}
          hasBackdrop={false}
          useNativeDriver
        >
          <GameScreen />
        </Modal>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;

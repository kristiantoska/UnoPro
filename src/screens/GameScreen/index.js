import React, { useRef } from 'react';
import { Transition, Transitioning } from 'react-native-reanimated';

import {
  GameBackground,
  Player,
  CardPile,
  ColorPicker,
} from '../../components';
import useGameState from '../../utils/useGameState';
import styles from './styles';

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" durationMs={200} />
    <Transition.In type="fade" durationMs={100} />
  </Transition.Sequence>
);

// bottom is reserved for the main player
const POSITIONS = ['top', 'left', 'right'];

const GameScreen = ({ socket, room, username, aiEnabled = false }) => {
  const containerRef = useRef();
  let positionsIndex = -1;

  const [
    gameState,
    { drawCard, activeCardFilter, onCardClick, onColorPick, sayUno },
    areTurnsReversed,
  ] = useGameState({
    socket,
    room,
    playersData: room.players,
    aiEnabled,
    containerRef,
  });

  containerRef.current && containerRef.current.animateNextTransition();

  const {
    turn,
    pileCards,
    boardColor,
    players,
    colorPickerVisible,
    cardDrawnThisTurn,
    unoSaidThisTurn,
    gameActive,
  } = gameState;

  const currentPlayerProps = {
    unoSaidThisTurn,
    sayUno,
  };

  return (
    <Transitioning.View
      ref={containerRef}
      style={styles.container}
      transition={transition}
    >
      <GameBackground
        boardColor={boardColor}
        turnsReversed={areTurnsReversed}
        cardDrawnThisTurn={cardDrawnThisTurn}
        drawCard={drawCard}
      />

      <CardPile pileCards={pileCards} />

      {room.players.map((player, i) => {
        const isCurrentPlayer = player.name === username;

        if (!isCurrentPlayer) {
          positionsIndex++;
        }

        return (
          <Player
            key={i}
            position={isCurrentPlayer ? 'bottom' : POSITIONS[positionsIndex]}
            cards={players[`p${i + 1}`]}
            hasTurn={turn === `p${i + 1}`}
            active={isCurrentPlayer || !aiEnabled}
            {...{
              activeCardFilter,
              onCardClick,
              gameActive,
              ...(isCurrentPlayer && currentPlayerProps),
            }}
          />
        );
      })}

      <ColorPicker visible={colorPickerVisible} onColorClick={onColorPick} />
    </Transitioning.View>
  );
};

export default GameScreen;

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

const OPTIONS = {
  numPlayers: 4,
  aiEnabled: false,
};

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" durationMs={200} />
    <Transition.In type="fade" durationMs={100} />
  </Transition.Sequence>
);

const GameScreen = () => {
  const containerRef = useRef();

  const [
    gameState,
    { drawCard, activeCardFilter, onCardClick, onColorPick, sayUno },
    areTurnsReversed,
  ] = useGameState({
    ...OPTIONS,
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

      <Player
        position="bottom"
        cards={players.p1}
        hasTurn={turn === 'p1'}
        active
        {...{
          activeCardFilter,
          onCardClick,
          unoSaidThisTurn,
          sayUno,
          gameActive,
        }}
      />

      {OPTIONS.numPlayers > 2 && (
        <Player
          position="left"
          cards={players.p2}
          hasTurn={turn === 'p2'}
          active={!OPTIONS.aiEnabled}
          {...{
            activeCardFilter,
            onCardClick,
            gameActive,
          }}
        />
      )}

      <Player
        position="top"
        cards={OPTIONS.numPlayers === 2 ? players.p2 : players.p3}
        hasTurn={turn === (OPTIONS.numPlayers === 2 ? 'p2' : 'p3')}
        active={!OPTIONS.aiEnabled}
        {...{
          activeCardFilter,
          onCardClick,
          gameActive,
        }}
      />

      {OPTIONS.numPlayers === 4 && (
        <Player
          position="right"
          cards={players.p4}
          hasTurn={turn === 'p4'}
          active={!OPTIONS.aiEnabled}
          {...{
            activeCardFilter,
            onCardClick,
            gameActive,
          }}
        />
      )}

      <ColorPicker visible={colorPickerVisible} onColorClick={onColorPick} />
    </Transitioning.View>
  );
};

export default GameScreen;

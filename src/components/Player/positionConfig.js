const positionConfig = (height, width) => ({
  top: { top: 0, transform: [{ rotate: '180deg' }] },
  bottom: { bottom: 0 },
  right: {
    right: -width / 2 + height / 2,
    transform: [{ rotate: '-90deg' }],
  },
  left: { left: -width / 2 + height / 2, transform: [{ rotate: '90deg' }] },
});

export default positionConfig;

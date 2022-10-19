export const getPositions = async (req, res, next) => {
  res.status(200).json({
    success: true,
    positions: [
      {
        id: 1,
        name: 'Security',
      },
      {
        id: 2,
        name: 'Designer',
      },
      {
        id: 3,
        name: 'Content manager',
      },
      {
        id: 4,
        name: 'Lawyer',
      },
    ],
  });
};

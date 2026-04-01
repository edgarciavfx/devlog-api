export const getExample = (req, res) => {
  res.json({ message: 'Hello World' });
};

export const postExample = (req, res) => {
  const { data } = req.body;
  res.status(201).json({ received: data });
};

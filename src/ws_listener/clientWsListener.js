const clientWsListener = socket => {
  console.log('Client connected - ' + socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected - ' + socket.id);
  });
};

export default clientWsListener
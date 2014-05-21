artillery.servers([
  {host: 'webrebels.yld.io', port: 80}
]);

artillery.load([
  artillery.arrival_phase({duration: 5, unit: 'second', phase: '1', users: [
    {rate: 10, unit: 'second'}
  ]})
]);

artillery.session({name: 'meowtest', probability: 100, type:'websocket',
  requests: [
    ws.connect('/engine.io/?EIO=3&transport=websocket'),
    ws.send('4hi WebRebels'),
    ws.close()
  ]});

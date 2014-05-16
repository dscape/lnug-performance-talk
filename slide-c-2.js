artillery.servers( [ { host: '165.225.137.169', port: 8080 } ] );

artillery.load([
  artillery.arrival_phase({
    duration: 10,
    unit: 'second',
    phase: '1',
    users: [ { rate: 1, unit: 'second' } ]})
]);

artillery.session({
  name: 'hello-world',
  probability: 100,
  requests: [ http.get('/') ]
});

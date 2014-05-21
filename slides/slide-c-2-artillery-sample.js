//
// check artillery.io for sweet node load testing
//
artillery.servers( [ { host: 'meowhost', port: 0xCA7 } ] );

artillery.load([
  artillery.arrival_phase({ duration: 10, unit: 'second', phase: '1',
    users: [ { rate: 1, unit: 'second' } ]})
]);

artillery.session({ name: 'hello-world', probability: 100,
  requests: [ http.get('/') ]
});

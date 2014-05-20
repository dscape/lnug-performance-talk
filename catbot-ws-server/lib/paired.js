//
// glue is the logic of adding event emitter when people pair
// check server for info
//
// examples can be send data, pictures, whatever logic is needed
//
// events are the name of the events handled in the glue code
// (array)
//
module.exports = function (glue, events) {
  var free     = { cat: [], person: [] }
    , paired   = {}
    ;

  //
  // find a date for a creature
  //
  // cats like humans
  // humans like cats
  //
  // for now, cats cant like cats
  // and humans, everyone knows, hate each other
  //
  function pair(creature) {
    //
    // humans <3 cats
    //
    var looking_for = creature._type === 'cat' ? 'person' : 'cat';

    //
    // try to get someone to love
    // from the free pool
    //
    var my_love = free[looking_for].pop();

    //
    // if we found a free creature from the other species
    //
    if (my_love) {
      //
      // advertise to the world our relationship
      // i mean, to console.log
      //
      console.log(creature.id + ' <3 ' + my_love.id);

      //
      // set the pairings
      //
      paired[creature.id] = my_love;
      paired[my_love.id]  = creature;

      //
      // execute the glue code, some heuristic that registers
      // a bunch of event handlers that have their keys defined
      // in the events variable
      //
      var glue_struct             = {};
      glue_struct[creature._type] = creature;
      glue_struct[my_love._type]  = my_love;
      glue(glue_struct);

      //
      // tell them you love them
      //
      my_love.emit('paired');
      creature.emit('paired');
    } else {
      //
      // we have to wait
      //
      console.log('forever alone ' + creature.id);
      free[creature._type].push(creature);
    }
  }

  //
  // dumping someone
  //
  // disconnectEvent is when you die,
  // your not dumping them for another person, its just that
  // you dont want to play this game anymore
  //
  function next(creature, disconnectEvent) {
    //
    // find my current love (not for long sucker)
    //
    var my_love = paired[creature.id];

    //
    // remove all the event listeners defined in glue
    //
    events.forEach(function (evt) {
      creature.removeAllListeners(evt);
    });

    //
    // make our divorce official
    //
    delete paired[creature.id];
    creature.emit('unpaired');

    //
    // if im just being a jerk and dumped someone
    // then im looking for a new catfriend/humanfriend
    //
    if(!disconnectEvent) {
      pair(paired[mylove.id]);
    }

    //
    // if my love still exists
    //
    if(my_love) {
      delete paired[my_love.id];

      events.forEach(function (evt) {
        my_love.removeAllListeners(evt);
      });

      my_love.emit('unpaired');
      pair(my_love);
    }
  }

  return { pair   : pair
         , next   : next
         };
};

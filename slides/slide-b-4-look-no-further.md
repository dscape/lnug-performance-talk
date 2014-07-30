
  # what should i be looking at?
    * basics: cpu, mem, disk                [script]
    * what code paths are the slowest?      [apms]
    * is the event loop blocked?
      for how long?  blocked why?           [dtrace, toobusy]
    * how many request are you handling?
      normal? low?                          [script, apms]
    * what are you connection pool sizes.   [code]
      try adjusting and re-running tests
    * memory leak?                          [mdb in solaris]
    * why are there performance issues?     [apms]
      * database latency?
      * other services?






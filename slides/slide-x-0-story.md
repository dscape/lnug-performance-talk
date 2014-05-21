
  # sample case #1

    * application crashing in production hundreds
      of times a day
    * high CPU Usage
    * high concurrency level on server (2000/req/s)
    * huge core dump, small heap dump

    ## culprit?

      * mongodb was joining and bringing way too
        much data for each request
      * unbound joins, e.g. people with a million friends
      * async.parallel without any `Limit`

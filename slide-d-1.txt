






  dtrace -n 'profile-97/execname == "node" && arg1/{
    @[jstack(150, 8000)] = count(); } tick-60s { exit(0); }' > stacks.out







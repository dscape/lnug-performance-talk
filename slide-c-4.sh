PROCESSPID=`pgrep -f node`
while [ 1 ]
do
    CPU=`/usr/bin/ps -o pcpu -p $PROCESSPID | tail -n +2`
    NUMCON=`/usr/bin/netstat -n | grep ESTABLISHED | wc -l`
    RSS=`/usr/bin/ps -o rss -p $PROCESSPID | tail -n +2`
    VSZ=`/usr/bin/ps -o vsz -p $PROCESSPID | tail -n +2`
    echo "`date`\t`date +%s`\t$CPU\t$RSS\t$VSZ\t$NUMCON"
    sleep 3
done | tee -a /opt/local/www/api/log/process_stats.log

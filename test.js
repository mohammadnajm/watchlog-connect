const watchlog = require('./index')
setInterval(()=>{
    // watchlog.increment("join_increment")
    // // watchlog.decrement("join_increment")
    // watchlog.distribution("join_distribution",45)
    // watchlog.percentage("join_percentage",12)
    // watchlog.systembyte("join_systembyte",1024*1024*1024)
    // watchlog.gauge("join_gauge",2018)
    watchlog.log("nodeTset", "default full log")
    watchlog.successLog("nodeTset", "successLog full log")
    watchlog.errorLog("nodeTset", "errorLog full log")
    watchlog.warningLog("nodeTset", "warningLog full log")

},1000)
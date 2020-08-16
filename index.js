let uuid = () => {
    let d = new Date();
    let uuid = "uuid" + d.getDay() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds() + Math.ceil(Math.random() * 10000000);
    return uuid;
}

let defaultOpt = `{
    chart: {
        type: 'bar' 
    },
    title: {
        text: '我的第一个图表'
    },
    xAxis: {
        categories: ['苹果', '香蕉', '橙子'] 
    },
    yAxis: {
        title: {
            text: '吃水果个数' 
        }
    },
    series: [{                
        name: '小明',  
        data: [1, 0, 4] 
    }, {
        name: '小红',
        data: [5, 7, 3]
    }]
}`


let highchartsRender = (args,opt) => {
    let options = "{}";
    if(opt.length){
        options = opt
    }
    let id = uuid()
    let template = `
        <script src="https://code.highcharts.com.cn/highcharts/8.1.2/highcharts.js"></script>
        <script src="https://code.highcharts.com.cn/highcharts/8.1.2/modules/exporting.js"></script>
        <script src="https://code.highcharts.com.cn/highcharts/8.1.2/modules/annotations.js"></script>
        <script src="https://code.highcharts.com.cn/highcharts/8.1.2/modules/oldie.js"></script>
        <div id="highcharts${id}" width="${args[0] || "85%"}" height="${args[1] || 400}"></div>
        <script>
            var op = Object.assign(${defaultOpt},${options})
            if(op.url){
                $.ajax({
                    url: op.url,
                    type: "JSON",
                    method: op.method || "GET",
                    success: function(res){
                        if(op.seriesFormat){
                            op.series = op.seriesFormat(res)
                        } else {
                            op.series = res;
                        }
                        var chart = Highcharts.chart(highcharts${id},op);
                    }
                })
            }else{
                var chart = Highcharts.chart(highcharts${id},op);
            }
        </script>
    `;
    return template;
}

hexo.extend.tag.register('highcharts',highchartsRender,{
    async: true,
    ends: true
})
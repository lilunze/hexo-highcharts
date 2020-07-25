const highcharts = require('highcharts');

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
        <div id="highcharts${id}" width="${args[0] || "85%"}" height="${args[1] || 400}"></div>
        <script>
            window.highcharts = ${highcharts}();
            var options = Object.assign(${defaultOpt},${options})
            if(options.url){
                var xmlHttp = null;
                if(window.XMLHttpRequest){
                    xmlHttp = new XMLHttpRequest;
                }else if(window.ActiveXObject){
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  // 兼容老版本IE
                }
                if(xmlHttp !== null){
                    var httpMethod = (options.method || "GET").toUpperCase();
                    if(httpMethod == "POST"){
                        var data = options.params || {};
                        var requestData = '';
                        for(var key in data){
                            requestData = requestData + key + "=" + data[key] + "&";
                        }
                        if(requestData == ''){
                            requestData = '';
                        }else{
                            requestData = requestData.substring(0, requestData.length - 1);
                        }
                    }
                    if(httpMethod == 'GET'){
                        xmlHttp.open("GET", options.url, true);
                        xmlHttp.send(null);
                    }else if(httpMethod == "POST"){
                        xmlHttp.open("POST", options.url, true);
                        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xmlHttp.send(requestData);
                    }
                    xmlHttp.onreadystatechange = function(){
                        if(xmlHttp.readyState == 4){
                            if(xmlHttp.status == 200){
                                let res = JSON.parse(xmlHttp.responseText);
                                if (res) {
                                    options.series = res;
                                    var chart = window.highcharts.chart(highcharts${id},options);
                                } else {
                                    console.log(res);
                                }
                            }
                        }
                    }
                }
            }else{
                var chart = window.highcharts.chart(highcharts${id},options);
            }
            
        </script>
    `;
    return template;
}

hexo.extend.tag.register('highcharts',highchartsRender,{
    async: true,
    ends: true
})
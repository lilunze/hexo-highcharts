# hexo-highcharts
A simple plugin for inserting Highcharts by using tags in Hexo
[Demo](https://lilunze.github.io/2020/07/25/hexo-highcharts/)

## Install
```
npm install hexo-highcharts --save
```

## usage
```
{% highcharts %}
// highcharts options here
{% endhighcharts %}
```

you can use ajax data set options:
```
{
    url: "",
    method: "GET" || "POST",
    params: { ... }
}
```

data format is highcharts options series



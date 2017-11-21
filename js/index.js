var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    followFinger: false,
    speed: 800,
    width: window.innerWidth,
    height: window.innerHeight,
    mousewheelControl: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    paginationBulletRender: function(swiper, index, className) {
        // return '<span class="' + className + '">' + (index) + '</span>';
    },
    onInit: function(swiper) {
        slide = swiper.slides.eq(0);
        slide.addClass('ani-slide');
    },
    onTransitionStart: function(swiper) {
        for (i = 0; i < swiper.slides.length; i++) {
            slide = swiper.slides.eq(i);
            slide.removeClass('ani-slide');
        }
    },
    onTransitionEnd: function(swiper) {
        slide = swiper.slides.eq(swiper.activeIndex);
        slide.addClass('ani-slide');

    },
    onReachBeginning: function(swiper) {
        // alert('到了第一个slide');
    },
    onSlideChangeStart: function(swiper) {
        // alert(swiper.activeIndex);
        changeClass(swiper.activeIndex)

    },
    onSlideChangeEnd: function(swiper) {
        // alert(swiper.activeIndex)
        let top = document.querySelector('.top')
        if (swiper.activeIndex === 2) {
            myChart.setOption(option);
            myChart2.setOption(option2);
        }
        if (swiper.activeIndex === 0) {
            top.style.opacity = '0'
            top.style.height = '0px'
        } else {
            top.style.opacity = '1'
            top.style.height = '48px'
        }
    }

});
let menu = document.querySelector('.menu')

for (let i = 0; i < menu.children.length; i++) {
    menu.children[i].addEventListener('click', function() {
        changeClass(i)
        swiper.slideTo(i, 1000, true)
    })
}

function changeClass(index) {
    removeClass()
    menu.children[index].className = 'current'
}

function removeClass() {
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].classList.remove('current')
    }
}

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var myChart2 = echarts.init(document.getElementById('main2'));

// 指定图表的配置项和数据
var option = {
    backgroundColor: '#2c343c',

    title: {
        text: '专业技能',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    color: [],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['HTML', 'CSS', 'JavaScript', 'JQuery', 'Ajax', 'Vue', 'Node.js'],
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#fff', //左边线的颜色
                width: '2' //坐标线的宽度
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff', //坐标值得具体的颜色

            }
        }
    }],
    yAxis: [{
        type: 'value',
        max: '5',
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#fff',
                width: '2'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    }],
    series: [{
        name: '熟练度',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
            normal: {
                color: function(params) {
                    // build a color map as your need.
                    var colorList = ['#e54d26', '#fa8c35', '#faff72', '#21a675', '#00e09e', '#4b5cc4', '#8d4bbb']
                    return colorList[params.dataIndex]
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                }
            }
        },
        data: [4, 4, 3, 3.5, 3, 3.5, 2]
    }]
};
let option2 = {
    backgroundColor: '#2c343c',

    title: {
        text: '浏览网站',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [{
        name: '访问热度',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
            { value: 310, name: 'Coding' },
            { value: 335, name: '其他(V2EX、cnode、知乎...)' },
            { value: 274, name: 'StackOverFlow' },
            { value: 235, name: 'SegmentFault' },
            { value: 400, name: 'Github' }
        ].sort(function(a, b) { return a.value - b.value; }),
        roseType: 'radius',
        label: {
            normal: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            }
        },
        itemStyle: {
            normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function(idx) {
            return Math.random() * 200;
        }
    }]
};
// 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);
// myChart2.setOption(option2);
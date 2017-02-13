$(function(){
    banner();
    /*需要自己初始化工具提示*/
    $('[data-toggle=tooltip]').tooltip();

    initTab();
});
/*轮播图*/
var banner = function(){

    var data = [
        {
            mUrl:'images/slide_01_640x340.jpg',
            pcUrl:'images/slide_01_2000x410.jpg'
        },
        {
            mUrl:'images/slide_02_640x340.jpg',
            pcUrl:'images/slide_02_2000x410.jpg'
        },
        {
            mUrl:'images/slide_03_640x340.jpg',
            pcUrl:'images/slide_03_2000x410.jpg'
        },
        {
            mUrl:'images/slide_03_640x340.jpg',
            pcUrl:'images/slide_03_2000x410.jpg'
        },
        {
            mUrl:'images/slide_03_640x340.jpg',
            pcUrl:'images/slide_03_2000x410.jpg'
        },
        {
            mUrl:'images/slide_03_640x340.jpg',
            pcUrl:'images/slide_03_2000x410.jpg'
        },
        {
            mUrl:'images/slide_04_640x340.jpg',
            pcUrl:'images/slide_04_2000x410.jpg'
        }
    ]

    /*渲染页面*/
    var render = function(){
        /*2.判断当前设备*/
        /*3.根据设备渲染成所需要的样式*/
        /*4.渲染到页面当中*/

        /*2.判断当前设备*/
        /*获取浏览器宽度 设备宽度*/
        var width = $(window).width();
        /*判断是否是移端  项目情况是移动端 宽度小于768px的时候*/
        var isMobile = width < 768 ? true : false;

        /*3.根据设备渲染成所需要的样式*/
        /*1.准备模版*/
        /*2.把模版内容转换成模版函数*/
        var templatePointFuc = _.template($('#template_point').html());
        var templateImageFuc = _.template($('#template_image').html());
        /*3.把数据传到模版函数返回的是html格式的字符串*/
        var pointHtml = templatePointFuc({list:data});
        var imageHtml = templateImageFuc({data:data,isM:isMobile});

        console.log(pointHtml);
        console.log(imageHtml);

        /*4.渲染到页面当中*/
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);

    }

    /*5.测试*/
    $(window).on('resize',function(){
        render();
    }).trigger('resize');/*trigger  js主动触发这个事件会执行回调函数*/

    /*6.在移动端按手势的方向来切换滑动图片*/
    var startX = 0;
    var moveX =0;
    var distanceX =0;
    var isMove = false;
    /*在jquery当中绑定touch事件的时候是通过originalEvent返回的触发事件对象TouchEvent*/
    $('.zcw_banner')
        .on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        })
        .on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;
        })
        .on('touchend',function(e){
            /*确定手势的条件*/
            /*移动的距离要超过50px*/
            if(isMove && Math.abs(distanceX) > 50){
                /*上一张*/
                /*向右滑*/
                if(distanceX>0){
                    $('#carousel-example-generic').carousel('prev');
                }
                /*下一张*/
                /*向左滑*/
                else{
                    $('#carousel-example-generic').carousel('next');
                }
            }

        });

}

var initTab = function(){
    /*
    * 1.让ul足够装下li容器
    * 2.滑动  自己编写 swipe   第三方的  iscroll
    * */

    /*1.让ul足够装下li容器*/
    var tab =  $('.zcw_product .nav-tabs');
    var lis = tab.find('li');

    var width = 0;
    lis.each(function(){
        width += $(this).width();
    });

    tab.width(width);

    /*滑动*/
    /*swipe*/
    /*itcast.iScroll({
        swipeDom:$('.nav-tabs-parent')[0],
        swipeType:'y',
        swipeDistance:50
    });*/

    /*iscroll*/
    new IScroll(".nav-tabs-parent",{
        scrollX: true,
        scrollY: false
    });

}
$(document).ready(function () {
    Map();
});

function Map() {
    /*
    * 配置Raphael生成svg的属性
    */
    $("#map").html("");
    Raphael.getColor.reset();
    var R = Raphael("map", 600, 500); //大小与矢量图形文件图形对应；

    var current = null;

    var textAttr = {
        "fill": "#000",
        "font-size": "12px",
        "cursor": "pointer"
    };

    //调用绘制地图方法
    paintMap(R);

    for (var state in china) {
        //分省区域着色
        china[state]['path'].color = Raphael.getColor(0.9);
        //china[state]['path'].animate({fill: china[state]['path'].color, stroke: "#eee" }, 500);
        china[state]['path'].transform("t30,0");

        (function (st, state) {
            //console.log(st);
            //***获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);

            st.animate({fill: st.color, stroke: "#eee"}, 500);

            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 20;
                    yy += 10;
                    break;
                case "上海":
                    xx += 20;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 20;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }




            //***写入地名,并加点击事件,部分区域太小，增加对文字的点击事件
            china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr).click(function () {
                clickMap();
            }).hover(function () {
                if (current == state)
                    return;
                st.animate({fill: st.color, stroke: "#eee","fill-opacity": 0.5}, 500);
                china[state]['text'].toFront();
                R.safari();
            }, function () {
                if (current == state)
                    return;
                st.animate({fill: st.color, stroke: "#eee","fill-opacity": 1}, 500);
                china[state]['text'].toFront();
                R.safari();
            });

            //图形的点击事件
            $(st[0]).click(function (e) {
                clickMap();
            });

            //鼠标样式
            $(st[0]).css('cursor', 'pointer');
            
            //移入事件,显示信息
            $(st[0]).hover(function (e) {
                if (current == state)
                    return;
                st.animate({fill: st.color, stroke: "#eee","fill-opacity": 0.5}, 500);
                china[state]['text'].toFront();
                R.safari();
            },function(){
                if (current == state)
                    return;
                st.animate({fill: st.color, stroke: "#eee","fill-opacity": 1}, 500);
                china[state]['text'].toFront();
                R.safari();
            });

            function clickMap() {
                if (current == state)
                    return;
                //重置上次点击的图形
                current && china[current]['path'].animate({ transform: "t30,0", fill: china[current]['path'].color, stroke: "#ddd","fill-opacity": 1 }, 2000, "elastic");

                current = state;    //将当前值赋给变量
                //对本次点击
                china[state]['path'].animate({ transform: "t30,0 s1.03 1.03", fill: china[state]['path'].color, stroke: "#000","fill-opacity": 1 }, 1200, "elastic");
                st.toFront();   //向上
                R.safari();

                china[current]['text'].toFront();   //***向上

                if (china[current] === undefined) return;

                console.log(china[current]['name']);

                window.location.href="http://www.dc.com/map/show?name="+china[current]['name'];
            }
        })

        (china[state]['path'], state);
    }
}


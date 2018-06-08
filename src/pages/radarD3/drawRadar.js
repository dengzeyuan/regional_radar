export default function drawRadar(time, that) {
  that.svgwidths = document.documentElement.querySelector(".view").clientWidth - 10;
  let d3 = that.$d3;
  let width = that.svgwidths,
    height = that.svgheight.match(/\d+/g)[0];
  let color = d3.schemeCategory10;

  //日期改变
  if (!time) {
    time = {
      startDate: (function () {
        let star = new Date().getTime() - 7 * 2 * 24 * 60 * 60 * 1000;
        return (
          jsonymr(star, "y") + "-" + jsonymr(star, "m") + "-" + jsonymr(star, "r")
        );
      })(),
      endDate: (function () {
        let star = new Date().getTime() - 24 * 60 * 60 * 1000;
        return (
          jsonymr(star, "y") + "-" + jsonymr(star, "m") + "-" + jsonymr(star, "r")
        );
      })(),
    }
  }

  //格式化日期
  function jsonymr(data, m) {
    if (m == "y") {
      return new Date(data).getFullYear() > 9 ? new Date(data).getFullYear() : "0" + (new Date(data).getFullYear())
    }
    if (m == "m") {
      return new Date(data).getMonth() + 1 > 9 ? new Date(data).getMonth() + 1 : "0" + (new Date(data).getMonth() + 1)
    }
    if (m == "r") {
      return new Date(data).getDate() > 9 ? new Date(data).getDate() : "0" + (new Date(data).getDate())
    }
  }

  //雷达图数据
  let data = "";

  function axios() {
        //如果没有请求，就用真实模拟的数据
        let realyResponseDate={
          type: [
              {
                  "name": "经营类",
                  "items": [
                      {
                          "name": "目标销售额",
                          "rangeMid": 100,
                          "rangeMin": 50,
                          "rangeMax": 150,
                          "value": 120
                      },
                      {
                          "name": "总销售额",
                          "rangeMid": 1500,
                          "rangeMin": 0,
                          "rangeMax": 3000,
                          "value": 225.18
                      },
                      {
                          "name": "日均销售额",
                          "rangeMid": 500,
                          "rangeMin": 0,
                          "rangeMax": 1000,
                          "value": 161.08
                      },
                      {
                          "name": "总毛利",
                          "rangeMid": 3000,
                          "rangeMin": 0,
                          "rangeMax": 6000,
                          "value": 1419.18
                      },
                      {
                          "name": "日均毛利",
                          "rangeMid": 10000,
                          "rangeMin": 0,
                          "rangeMax": 20000,
                          "value": 1069.01
                      },
                      {
                          "name": "毛利率",
                          "rangeMid": 0.1,
                          "rangeMin": 0,
                          "rangeMax": 0.2,
                          "value": 0.07
                      },
                      {
                          "name": "总订单数",
                          "rangeMid": 4500,
                          "rangeMin": 0,
                          "rangeMax": 9000,
                          "value": 3600
                      },
                      {
                          "name": "日均订单数",
                          "rangeMid": 1500,
                          "rangeMin": 20,
                          "rangeMax": 3000,
                          "value": 2572
                      },
                      {
                          "name": "总客单价",
                          "rangeMid": 60,
                          "rangeMin": 0,
                          "rangeMax": 120,
                          "value": 62.63
                      },
                      {
                          "name": "商城客单价",
                          "rangeMid": 60,
                          "rangeMin": 0,
                          "rangeMax": 120,
                          "value": 50.28
                      },
                      {
                          "name": "体验店客单价",
                          "rangeMid": 60,
                          "rangeMin": 0,
                          "rangeMax": 120,
                          "value": 63.3
                      }
                  ]
              },
              {
                  "name": "促销类",
                  "items": [
                      {
                          "name": "预测促销销售额",
                          "rangeMid": 100,
                          "rangeMin": 0,
                          "rangeMax": 200,
                          "value": 100
                      },
                      {
                          "name": "预测用户增加数",
                          "rangeMid": 20,
                          "rangeMin": 0,
                          "rangeMax": 40,
                          "value": 30
                      },
                      {
                          "name": "计划覆盖用户数",
                          "rangeMid": 40,
                          "rangeMin": 0,
                          "rangeMax": 80,
                          "value": 80
                      },
                      {
                          "name": "预测商品销售额",
                          "rangeMid": 1000,
                          "rangeMin": 0,
                          "rangeMax": 2000,
                          "value": 1500
                      }
                  ]
              },
              {
                  "name": "商品类",
                  "items": [
                      {
                          "name": "商品品类销售占比",
                          "rangeMid": 200,
                          "rangeMin": 0,
                          "rangeMax": 400,
                          "value": 300
                      },
                      {
                          "name": "商品动销率",
                          "rangeMid": 0.8,
                          "rangeMin": 0.4,
                          "rangeMax": 1.2,
                          "value": 0.49
                      }
                  ]
              },
              {
                  "name": "供应链",
                  "items": [
                      {
                          "name": "库存周转天数",
                          "rangeMid": 200,
                          "rangeMin": 100,
                          "rangeMax": 300,
                          "value": 180
                      },
                      {
                          "name": "缺货率",
                          "rangeMid": 50,
                          "rangeMin": 10,
                          "rangeMax": 90,
                          "value": 30
                      }
                  ]
              },
              // {
              //     "name": "员工类",
              //     "items": [
              //         {
              //             "name": "员工人数",
              //             "rangeMid": 90,
              //             "rangeMin": 60,
              //             "rangeMax": 120,
              //             "value": 100
              //         }
              //     ]
              // },
              {
                  "name": "用户类",
                  "items": [
                      {
                          "name": "用户增加数",
                          "rangeMid": 10000,
                          "rangeMin": 0,
                          "rangeMax": 20000,
                          "value": 8236
                      },
                      {
                          "name": "用户活跃数",
                          "rangeMid": 140,
                          "rangeMin": 70,
                          "rangeMax": 210,
                          "value": 99
                      },
                      {
                          "name": "复购率",
                          "rangeMid": 1,
                          "rangeMin": 0.5,
                          "rangeMax": 1.5,
                          "value": 1.45
                      },
                      {
                          "name": "用户流失数",
                          "rangeMid": 1000,
                          "rangeMin": 500,
                          "rangeMax": 1500,
                          "value": 800
                      }
                  ]
              }
          ]
        }
        that.loading= false;
        data = realyResponseDate;
        that.initrada(data);//将参数data赋值给vue组件
        let number = 0;
        data.type.forEach(function(d,v){
          number ++
          d.items.forEach(function(dc,vc){
            number ++;
          })
        })
        let onePiece=2 * Math.PI/number;  //一份占的角度
        enterdrawRada(data,onePiece,number) //开始绘制雷达图
      // })
   
  }
  axios()

  function enterdrawRada(data,onePiece,number) {
    let onedeg = 360/number;
    console.log(onedeg)
    let radius = 200, //坐标轴长度，实际值坐标点在图上位置是根据比例计算出的坐标
      outerRadius = radius, //圆弧半径最大值
      innerRadius = 0, //圆心
      level = 3, //三个环
      starts = 0,    //纵轴开始单位
      ends =  0, //纵轴结束单位
     dataset = {}, //圆弧的弧度范围
      valuePoints = []; //实际值所占图形像素位置坐标点
    data.type.forEach(function (d, vindex) {
      layout(d,vindex);//依次循环画每一个对象（分类）的半弧
    });
    leveover();   //绘制雷达线，和点击扇形区域效果
    function layout(type,vindex) {
      let main = d3       //将图形移动到中间
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
       polygons = {    //多边形坐标
        webs: [],
        webPoints: [],
        webpointRange: []
      };

      point(type,vindex); //计算多边形坐标点
      if(vindex == 0 ){
          dataset = {
            //圆弧角度范围
            startAngle: 0-onePiece,
            endAngle: onePiece * ends
          };
        }else{
          dataset = {
            //圆弧角度范围
            startAngle: dataset.endAngle, 
            endAngle: onePiece * ends
          };
        }

      // 添加纵轴
      let lines = main.append("g").classed("lines", true);
      lines
        .selectAll("line")
        .data(polygons.webPoints[0])
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d) {
          return d.x;
        })
        .attr("y2", function (d) {
          return d.y;
        })
        .attr("stroke", "#999")
        .attr("stroke-width", "1");

      // 中间内层圆
      let arcPathmiddle = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius * 0.7);
      main
        .append("path")
        .attr("d", arcPathmiddle(dataset))
        .attr("fill", "none")
        .attr("stroke", "#999");
      //内层弧
      let arcPathsmall = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius * 0.4);
      main
        .append("path")
        .attr("d", arcPathsmall(dataset))
        .attr("fill", "#ddd")
        .attr("stroke", "#999");

      main //分类
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dx","15")
        .attr("dy","10")
        .text(function () {
          return data.type[vindex].name;
        })
        .attr("transform", function () {
          return "translate(0 0) rotate("+((starts+((ends-starts)/2))*onedeg-110)+" 0,0)";
        })
        .attr("font-size", "12px");

      main //内环刻度
        .selectAll(".text")
        .data(polygons.webpointRange[2])
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .text(function (d) {
          return d.rangeMin>999?d.rangeMin/1000+"k":d.rangeMin;
        })
        .attr("transform","translate(-5,5)")
        .style("font-size", "12px");

      main //中环刻度
        .selectAll(".textmiddle")
        .data(polygons.webpointRange[1])
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .text(function (d) {
          return d.rangeMid>999?d.rangeMid/1000+"k":d.rangeMid;
        })
        .attr("transform","translate(-5,5)")
        .style("font-size", "12px");
      main //外环刻度
        .selectAll(".textouter")
        .data(polygons.webpointRange[0])
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .attr("transform", function (d, i) {
          return "translate(-10,10) ";
        })
        .text(function (d) {
          return d.rangeMax>999?d.rangeMax/1000+"k":d.rangeMax;
        })
        .attr("transform","translate(-5,5)")
        .style("font-size", "12px");

      // 计算文字标签坐标
      let textPoints = []
      textpoint();      //要在starts和ends有结果之后调用
      // // 绘制文字标签
      let texts = main.append("g").classed("texts", true);
      texts
        .selectAll("text")
        .data(textPoints)
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .attr("dx","10")
        .attr("dy","10")
        .text(function (d, i) {
          return type.items[i].name;
        })
        // .attr("stroke","#666")
        .attr("stroke-width", "1px")
        .attr("font-size", "12px")
        .attr("transform", function (d, i) {
            return "translate(0 0) rotate("+((starts+((ends-starts)/2))*onedeg-90)+" "+d.x+","+d.y+")"
        })

      valuepoint(type,vindex);   //实际值坐标计算

      // 外层弧度
      let arcPath = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
      main
        .append("path")
        .attr("d", arcPath(dataset))
        .attr("fill", "none")
        .attr("class", "radiusouter")
        .attr("stroke", "#999");

      function textpoint() {
        let start = starts;
        let end = ends;
        for (let i = start; i < end; i++) {
          let x = (radius+20) * Math.sin(i * onePiece),
            y = (radius+20) * Math.cos(i * onePiece);
          textPoints.push({
            x: x,
            y: -y
          });
        }
      }
      function point(type,vindex) {
        //计算刻度坐标点
        let start = 0;
        let end = 0;
          if (vindex !== 0) {  //之后的每个扇形都累加上一次的总和
          starts = start = ends + 1
          ends = end = ends + type.items.length +1 ;
          }else{    //第一个扇形
           starts = start = 0;
           ends = end = type.items.length ;
          }
        //三环分别计算每一环的坐标点
        for (let k = level; k > 0; k--) {
          let webs = 0,
            webPoints = [];   
          let pointminvalue = [];
          let r = 0,    //半径起点坐标
            tick = ""; //刻度
          if (k == 1) {
            //内弧的刻度和半径
            r = radius * 0.4;
            tick = "rangeMin";
          }
          if (k == 2) {
            //中弧的刻度和半径
            r = radius * 0.7;
            tick = "rangeMid";
          }
          if (k == 3) {   //最外层半径和刻度
            //和外弧保持一致
            r = radius;
            tick = "rangeMax";
          }
          for (let i = start; i < end; i++) {
            let x = r * Math.sin(i * onePiece),
              y = r * Math.cos(i * onePiece);
            webs += x + "," + y + " ";  //坐标练成字符串
            webPoints.push({          //坐标转化为对象
              x: x,
              y: -y
            });
            pointminvalue.push({    //刻度所在坐标
              x: x,
              y: -y
            });
          }
          polygons.webs.push(webs);
          polygons.webPoints.push(webPoints);
          for (let j = 0; j < type.items.length; j++) {
            pointminvalue[j][tick] = type.items[j][tick];
          }
          polygons.webpointRange.push(pointminvalue);
        }
      }
       function valuepoint(type,vindex) {
         let start = starts;
         let end = ends;
         for (let j = start, indexflag = 0; j < end;j++ , indexflag++) {
            let r = radius * 0.4 +(radius - radius * 0.4) *
              (Number(type.items[indexflag].value) - 
              Number(type.items[indexflag].rangeMin)) /
              (Number(type.items[indexflag].rangeMax) -
              Number(type.items[indexflag].rangeMin));
                if(isNaN(r)){
                  r = 0;
                }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: -y
            });
          }
      } 
    }
     function leveover() {
      let main = d3
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      let newareasData = "";
      valuePoints.forEach(function (v) {
        newareasData = newareasData + v.x + "," + v.y + " ";    //将坐标点转化为字符串通过多边形绘制雷达线
      });
      main    //雷达线用多边形来画
        .append("polygon")
        .attr("points", newareasData)
        .attr("stroke", function (d, index) {
          return "red";
        })
        .attr("fill", function (d, index) {
          return "#fe8b84";
        })
        .style("opacity", "0.4");

      for (let h = 0; h < data.type.length; h++) {
        let main = d3
          .select("svg")
          .append("g")
          .attr(
            "transform",
            "translate(" + width / 2 + "," + height / 2 + ")"
          );

        let start = 0;
        let end = 0;
        if (h !== 0) {  //之后的每个扇形都累加上一次的总和
          starts = start = ends + 1
          ends = end = ends + data.type[h].items.length + 1;
        } else {    //第一个扇形
          starts = start = 0;
          ends = end = data.type[h].items.length;
        }

        if (h == 0) {
          dataset = {
            //圆弧角度范围
            startAngle: 0 - onePiece,
            endAngle: onePiece * ends
          };
        } else {
          dataset = {
            //圆弧角度范围
            startAngle: dataset.endAngle,
            endAngle: onePiece * ends
          };
        }
        //外层弧添加点击事件（其他作用无）
        let arcPath = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
        main
          .append("path")
          .attr("d", arcPath(dataset))
          .attr("fill", "#ddd")
          .attr("opacity", "0")
          .on("click", function () {
            d3.selectAll(".areaPath").attr("opacity", "0");
            d3.select(this)
              .attr("opacity", "0.4")
              .attr("fill", "#9bffe2")
              .classed("areaPath", true);
            if (h == 0) {   //经营类
              that.clickrada( data.type[0] );
            }
            if (h == 1) {   //用户类
              that.clickrada( data.type[1] );
            }
            if (h == 2) {   //员工分析
              that.clickrada( data.type[2] );
            }
            if (h == 3) {
              that.clickrada( data.type[3] );
            }
            if (h == 4) {
              that.clickrada( data.type[4] );
            }
            if (h == 5) {
              that.clickrada( data.type[5] );
            }
          });
      }
    } 
  }
}
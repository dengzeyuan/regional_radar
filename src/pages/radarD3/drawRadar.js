export default function drawRadar(time, that) {
  //未解决问题？修改为雷达图扇形和角度都按照数组长度自动计算
  that.svgwidths = document.documentElement.querySelector(".view").clientWidth - 10;
  var d3 = that.$d3;
  var width = that.svgwidths,
    height = that.svgheight.match(/\d+/g)[0];
  var color = d3.schemeCategory10;

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
    // let newurl = url + time.startDate + "/" + time.endDate
    // that.axios.get(newurl)
    //   .then(response => {
    //     that.loading= false;
        // var array = new Array(6);
        // var data={type:[]};
        // if (response.data.data) {
        //   for (let i = 0; i < response.data.data.length; i++) {
        //     if (response.data.data[i].name == "经营类") {
        //       array[0] = response.data.data[i]
        //     }
        //     if (response.data.data[i].name == "用户类") {
        //       array[1] = response.data.data[i]
        //     }
        //     if (response.data.data[i].name == "员工分析指标") {
        //       array[2] = response.data.data[i]
        //     }
        //     if (response.data.data[i].name == "供应链") {
        //       array[3] = response.data.data[i]
        //     }
        //     if (response.data.data[i].name == "商品类") {
        //       array[4] = response.data.data[i]
        //     }
        //     if (response.data.data[i].name == "促销类") {
        //       array[5] = response.data.data[i]
        //     }
        //   }
        //   data.type = array;
        //   that.initrada(data);
        //   enterdrawRada(data) //开始绘制雷达图
        // }

        //如果没有请求，就用真实模拟的数据
        let realyResponseDate={
          "type": [
              {
                  "name": "经营类",
                  "items": [
                      {
                          "name": "目标销售额",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "总销售额",
                          "rangeMid": 1500000,
                          "rangeMin": 0,
                          "rangeMax": 3000000,
                          "value": 2255121.18
                      },
                      {
                          "name": "日均销售额",
                          "rangeMid": 50000,
                          "rangeMin": 0,
                          "rangeMax": 100000,
                          "value": 161080.08
                      },
                      {
                          "name": "总毛利",
                          "rangeMid": 300000,
                          "rangeMin": 0,
                          "rangeMax": 600000,
                          "value": 149450.18
                      },
                      {
                          "name": "日均毛利",
                          "rangeMid": 10000,
                          "rangeMin": 0,
                          "rangeMax": 20000,
                          "value": 10675.01
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
                          "rangeMid": 45000,
                          "rangeMin": 0,
                          "rangeMax": 90000,
                          "value": 36006
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
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "预测用户增加数",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "计划覆盖用户数",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "预测促销重点商品销售额",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      }
                  ]
              },
              {
                  "name": "商品类",
                  "items": [
                      {
                          "name": "商品品类销售占比",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "商品动销率",
                          "rangeMid": 0.5,
                          "rangeMin": 0,
                          "rangeMax": 1,
                          "value": 0.49
                      }
                  ]
              },
              {
                  "name": "供应链",
                  "items": [
                      {
                          "name": "库存周转天数",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "缺货率",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      }
                  ]
              },
              {
                  "name": "员工分析指标",
                  "items": [
                      {
                          "name": "员工人数",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      }
                  ]
              },
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
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "复购率",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      },
                      {
                          "name": "用户流失数",
                          "rangeMid": 0,
                          "rangeMin": 0,
                          "rangeMax": 100,
                          "value": 0
                      }
                  ]
              }
          ]
        }
        data = realyResponseDate;
        that.initrada(data);
        enterdrawRada(data) //开始绘制雷达图

      // })
   
  }
  axios()

  function enterdrawRada(data) {
    that.loading= false;
    let arc = 2 * Math.PI; //圆周
    let onePiece = arc / 30; //一份占的角度
    let radius = 150, //坐标轴长度，实际值坐标点在图上位置是根据比例计算出的坐标
      level = 3, //三个环
      // rangeMin = 0, //刻度最小值
      // rangeMax = radius, //刻度最大值
      total = data.type[0].items.length; //一个扇形包含的子元素
    var total2 = data.type[1].items.length + total + 1; //一个扇形包含的子元素
    var total3 = data.type[2].items.length + total2 + 1; //一个扇形包含的子元素
    var total4 = data.type[3].items.length + total3 + 1; //一个扇形包含的子元素
    var total5 = data.type[4].items.length + total4 + 1; //一个扇形包含的子元素
    var total6 = data.type[5].items.length + total5 + 1; //一个扇形包含的子元素
    var valuePoints = []; //根据值画雷达线
    var totalvalue = data.type[0].items; //分类成员
    var totalvalue2 = data.type[1].items;
    var totalvalue3 = data.type[2].items;
    var totalvalue4 = data.type[3].items;
    var totalvalue5 = data.type[4].items;
    var totalvalue6 = data.type[5].items;

    data.type.forEach(function (d, vindex) {
      layout(d,vindex);
    });
    leveover();
    function layout(d,vindex) {
      var main = d3
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var polygons = {
        webs: [],
        webPoints: [],
        webpointRange: []
      };

      // console.log(polygons);
      var dataset = {}; //圆弧的弧度范围

      var outerRadius = radius; //圆弧半径最大值
      var innerRadius = 0; //圆弧半径最小值
      point(vindex); //计算轴线坐标点
      if (vindex == 0) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          //原属角度范围
          startAngle: Math.PI + onePiece,
          endAngle: onePiece * 4
        };
      }
      if (vindex == 1) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          startAngle: 4 * onePiece,
          endAngle: -onePiece
        };
      }
      if (vindex == 2) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          startAngle: -onePiece,
          endAngle: -3 * onePiece
        };
      }
      if (vindex == 3) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          startAngle: -3 * onePiece,
          endAngle: -6 * onePiece
        };
      }
      if (vindex == 4) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          startAngle: -6 * onePiece,
          endAngle: -9 * onePiece
        };
      }
      if (vindex == 5) {
        // point(vindex); //计算轴线坐标点
        dataset = {
          startAngle: -9 * onePiece,
          endAngle: -14 * onePiece
        };
      }
      // console.log(polygons.webPoints[0]);
      // 添加纵轴
      var lines = main.append("g").classed("lines", true);
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
        .attr("stroke", "black")
        .attr("stroke-width", "1");

      //中间内层圆
      var arcPathmiddle = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius * 0.8);
      main
        .append("path")
        .attr("d", arcPathmiddle(dataset))
        .attr("fill", "none")
        .attr("stroke", "black");
      //内层弧
      var arcPathsmall = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius * 0.6);
      main
        .append("path")
        .attr("d", arcPathsmall(dataset))
        .attr("fill", "#ddd")
        .attr("stroke", "black");

      main //分类
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("transform", function () {
          if (vindex == 0) {
            return "translate(5 10)";
          }
          if (vindex == 1) {
            return "translate(15,-20) rotate(-80 0,0)";
          }
          if (vindex == 2) {
            return "translate(-10,-30) rotate(-120 0,0) scale(0.6)";
          }
          if (vindex == 3) {
            return "translate(-60,-30) rotate(20 0,0)";
          }
          if (vindex == 4) {
            return "translate(-60,10) rotate(-10 0,0)";
          }
          if (vindex == 5) {
            return "translate(-30,40) rotate(-45 0,0)";
          }
        })
        .text(function () {
          return data.type[vindex].name;
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
        .attr("transform", function (d, i) {
          if (vindex == 0) {
            if (i < 3) {
              return "translate(-4,4) rotate(-70 " + d.x + "," + d.y + ")";
            }
            return "translate(-8,4)";
          } else if (vindex == 1) {
            // return "translate(-8,-4) rotate(70 " + d.x + "," + d.y + ")";
          } else {
            return "translate(-8,4)";
          }
        })
        .text(function (d) {
          return d.rangeMin;
        })
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
        .attr("transform", function (d, i) {
          return "translate(-15,4) rotate(20 "+d.x+","+d.y+")";
        })
        .text(function (d) {
          return d.rangeMid>999?d.rangeMid/1000+"k":d.rangeMid;
        })
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
          return "translate(-15,0) rotate(20 "+d.x+","+d.y+")";
        })
        .text(function (d) {
          return d.rangeMax>999?d.rangeMax/1000+"k":d.rangeMax;
        })
        .style("font-size", "12px");

      // 计算文字标签坐标
      var textPoints = [];
      var textRadius = radius + 20;
      textpoint();

      // 绘制文字标签
      var texts = main.append("g").classed("texts", true);
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
        .text(function (d, i) {
          return data.type[vindex].items[i].name;
        })
        // .attr("stroke","#666")
        .attr("stroke-width", "1px")
        .attr("font-size", "12px")
        .attr("transform", function (d, i) {
          if (vindex == 0) {
            if (i < 5) {
              return "rotate(30 " + d.x + "," + d.y + ")";
            } else {
              return "rotate(-30 " + d.x + "," + d.y + ")";
            }
          }
          if (vindex == 1) {
            return "translate(-10,0) rotate(-20 " + d.x + "," + d.y + ")";
          }
          if (vindex == 2) {
            return "translate(-10,0) rotate(0 " + d.x + "," + d.y + ")";
          }
          if (vindex == 3) {
            if (i == 0) {
              return "translate(-60,20) rotate(-20 " + d.x + "," + d.y + ")";
            } else {
              return "translate(-30,20) rotate(-30 " + d.x + "," + d.y + ")";
            }
          }
          if (vindex == 4) {
            return "translate(-30,50) rotate(-60 " + d.x + "," + d.y + ")";
          }
          if (vindex == 5) {
            if (i == 0) {
              return "translate(-10,0) rotate(80 " + d.x + "," + d.y + ")";
            }
            if (i == 3) {
              return "translate(-10,0) rotate(30 " + d.x + "," + d.y + ")";
            }
            return "translate(-10,0) rotate(70 " + d.x + "," + d.y + ")";
          }
        });

      valuepoint(vindex);

      //外层弧度
      var arcPath = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
      main
        .append("path")
        .attr("d", arcPath(dataset))
        .attr("fill", "none")
        .attr("class", "radiusouter")
        .attr("stroke", "black");

      function textpoint() {
        let startlenth = 0;
        let endlength = 0;
        if (vindex == 0) {
          startlenth = 0;
          endlength = total;
        }
        if (vindex == 1) {
          startlenth = total + 1;
          endlength = total2;
        }
        if (vindex == 2) {
          startlenth = total2 + 1;
          endlength = total3;
        }
        if (vindex == 3) {
          startlenth = total3 + 1;
          endlength = total4;
        }
        if (vindex == 4) {
          startlenth = total4 + 1;
          endlength = total5;
        }
        if (vindex == 5) {
          startlenth = total5 + 1;
          endlength = total6;
        }
        for (var i = startlenth; i < endlength; i++) {
          var x = textRadius * Math.sin(i * onePiece),
            y = textRadius * Math.cos(i * onePiece);
          textPoints.push({
            x: x,
            y: y
          });
        }
      }
      function point(vindex) {
        //计算刻度坐标点
        let startlenth = 0;
        let endlength = 0;
        if (vindex == 0) {
          startlenth = 0;
          endlength = total;
        }
        if (vindex == 1) {
          startlenth = total + 1;
          endlength = total2;
        }
        if (vindex == 2) {
          startlenth = total2 + 1;
          endlength = total3;
        }
        if (vindex == 3) {
          startlenth = total3 + 1;
          endlength = total4;
        }
        if (vindex == 4) {
          startlenth = total4 + 1;
          endlength = total5;
        }
        if (vindex == 5) {
          startlenth = total5 + 1;
          endlength = total6;
        }
        for (var k = level; k > 0; k--) {
          var webs = 0,
            webPoints = [];
          var pointminvalue = [];
          var r = 0,
            range = "";
          if (k == 1) {
            //和内弧保持一致
            r = radius * 0.6;
            range = "rangeMin";
          }
          if (k == 2) {
            //和中弧保持一致
            r = radius * 0.8;
            range = "rangeMid";
          }
          if (k == 3) {
            //和外弧保持一致
            r = radius;
            range = "rangeMax";
          }
          for (var i = startlenth; i < endlength; i++) {
            var x = r * Math.sin(i * onePiece),
              y = r * Math.cos(i * onePiece);
            webs += x + "," + y + " ";
            webPoints.push({
              x: x,
              y: y
            });
            pointminvalue.push({
              x: x,
              y: y
            });
          }
          polygons.webs.push(webs);
          polygons.webPoints.push(webPoints);

          for (var j = 0; j < data.type[vindex].items.length; j++) {
            pointminvalue[j][range] = data.type[vindex].items[j][range];
          }
          polygons.webpointRange.push(pointminvalue);
        }
      }
      function valuepoint(vindex) {
        let startlenth = 0;
        let endlength = 0;
        if (vindex == 0) {
          startlenth = 0;
          endlength = total;
          // 计算值的坐标
          for (
            let j = startlenth, indexflag = 0; j < endlength;j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue[indexflag].value) -
                Number(totalvalue[indexflag].rangeMin)) /
              (Number(totalvalue[indexflag].rangeMax) -
                Number(totalvalue[indexflag].rangeMin));
                if(isNaN(r)){
                  r = 0;
                }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);

            // let x = totalvalue[j].value * Math.sin(j * onePiece),
            //   y = totalvalue[j].value * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });
          }
        }
        if (vindex == 1) {
          startlenth = total + 1;
          endlength = total2;
          // 计算值的坐标
          for (
            let j = startlenth, indexflag = 0;
            j < endlength;
            j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue2[indexflag].value) -
                Number(totalvalue2[indexflag].rangeMin)) /
              (Number(totalvalue2[indexflag].rangeMax) -
                Number(totalvalue2[indexflag].rangeMin));
                if(isNaN(r)){
                  r = 0;
                }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);

            // let x = totalvalue2[j - total - 1].value * Math.sin(j * onePiece),
            //   y = totalvalue2[j - total - 1].value * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });
          }
        }
        if (vindex == 2) {
          // 计算值的坐标
          for (
            let j = total2 + 1, indexflag = 0;
            j < total3;
            j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue3[indexflag].value) -
                Number(totalvalue3[indexflag].rangeMin)) /
              (Number(totalvalue3[indexflag].rangeMax) -
                Number(totalvalue3[indexflag].rangeMin));
                if(isNaN(r)){
                  r = 0;
                }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });

            // let x =
            //     totalvalue3[j - total2 - 1].value * Math.sin(j * onePiece),
            //   y = totalvalue3[j - total2 - 1].value * Math.cos(j * onePiece);
            // valuePoints.push({
            //   x: x,
            //   y: y
            // });
          }
        }
        if (vindex == 3) {
          for (
            let j = total3 + 1, indexflag = 0;
            j < total4;
            j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue4[indexflag].value) -
                Number(totalvalue4[indexflag].rangeMin)) /
              (Number(totalvalue4[indexflag].rangeMax) -
              Number(totalvalue4[indexflag].rangeMin));
              if(isNaN(r)){
                r = 0;
              }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);

            // let x =
            //     totalvalue4[j - total3 - 1].value * Math.sin(j * onePiece),
            //   y = totalvalue4[j - total3 - 1].value * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });
          }
        }
        if (vindex == 4) {
          for (
            let j = total4 + 1, indexflag = 0;
            j < total5;
            j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue5[indexflag].value) -
              Number(totalvalue5[indexflag].rangeMin)) /
              (Number(totalvalue5[indexflag].rangeMax) -
              Number(totalvalue5[indexflag].rangeMin));
              if(isNaN(r)){
                r = 0;
              }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);

            // let x =
            //     totalvalue5[j - total4 - 1].value * Math.sin(j * onePiece),
            //   y = totalvalue5[j - total4 - 1].value * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });
          }
        }
        if (vindex == 5) {
          for (
            let j = total5 + 1, indexflag = 0;
            j < total6;
            j++ , indexflag++
          ) {
            let r =
              radius * 0.6 +
              (radius - radius * 0.6) *
              (Number(totalvalue6[indexflag].value) -
              Number(totalvalue6[indexflag].rangeMin)) /
              (Number(totalvalue6[indexflag].rangeMax) -
              Number(totalvalue6[indexflag].rangeMin));
              if(isNaN(r)){
                r = 0;
              }
            let x = r * Math.sin(j * onePiece),
              y = r * Math.cos(j * onePiece);

            // let x =
            //     totalvalue6[j - total5 - 1].value * Math.sin(j * onePiece),
            //   y = totalvalue6[j - total5 - 1].value * Math.cos(j * onePiece);
            valuePoints.push({
              x: x,
              y: y
            });
          }
        }
      }
    }
    function leveover() {
      var main = d3
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      var newareasData = "";
      valuePoints.forEach(function (v) {
        newareasData = newareasData + v.x + "," + v.y + " ";
      });
      main
        .append("polygon")
        .attr("points", newareasData)
        .attr("stroke", function (d, index) {
          return "red";
        })
        .attr("fill", function (d, index) {
          return "#fe8b84";
        })
        .style("opacity", "0.5");

      for (let h = 0; h < data.type.length; h++) {
        var main = d3
          .select("svg")
          .append("g")
          .attr(
            "transform",
            "translate(" + width / 2 + "," + height / 2 + ")"
          );
        var dataset = {};
        if (h == 0) {
          dataset = {
            startAngle: Math.PI + onePiece,
            endAngle: onePiece * 4
          };
        }
        if (h == 1) {
          dataset = {
            startAngle: -onePiece,
            endAngle: 4 * onePiece
          };
        }
        if (h == 2) {
          dataset = {
            startAngle: -onePiece,
            endAngle: -3 * onePiece
          };
        }
        if (h == 3) {
          dataset = {
            startAngle: -3 * onePiece,
            endAngle: -6 * onePiece
          };
        }
        if (h == 4) {
          dataset = {
            startAngle: -6 * onePiece,
            endAngle: -9 * onePiece
          };
        }
        if (h == 5) {
          dataset = {
            startAngle: -9 * onePiece,
            endAngle: -14 * onePiece
          };
        }
        var outerRadius = radius;
        var innerRadius = 0;

        //外层弧添加点击事件（其他作用无）
        var arcPath = d3
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
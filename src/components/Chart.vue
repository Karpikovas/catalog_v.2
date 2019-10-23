<template>

    <div>
        <div class="row">
            <div class="col">
                <div class="chart" ref="chartdiv"></div>
            </div>
            <div class="col">
                <div class="chart" ref="piechartdiv"></div>
            </div>

        </div>

        <div class="row">
            <div class="col">
                <div class="chart" ref="linechartdiv"></div>
            </div>
            <div class="col">
                <div class="chart" ref="stackedchartdiv"></div>
            </div>
        </div>
    </div>



</template>

<script>

    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    am4core.useTheme(am4themes_animated);

    export default {
        name: "Chart",
        mounted() {
            Promise.all([
                this.$store.dispatch('getSubdivisions'),
                this.$store.dispatch('getEmployees')
            ]).finally(() => {

                /*-------------------- Гистограмма ------------------------*/

                let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
                chart.dataSource.reloadFrequency = 5000;

                chart.paddingRight = 20

                let dataSubdivisions = []
                let dataPosts = []

                this.$store.getters.subdivisions.forEach((item) => {
                    dataSubdivisions.push({ subdivision: item.name, count: 0 })
                })

                this.$store.getters.posts.forEach((item) => {
                    dataPosts.push({ post: item.name, count: 0 })
                })

                this.$store.getters.employees.forEach((item) => {
                    let targetIndexPost = dataPosts.findIndex(object => object.post === item.post)
                    let targetIndexSub = dataSubdivisions.findIndex(object => object.subdivision === item.subdivision)
                    dataPosts[targetIndexPost].count++
                    dataSubdivisions[targetIndexSub].count++
                })

                chart.data = dataPosts;

                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = "post";
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.fontSize = 16;


                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

                let series = chart.series.push(new am4charts.ColumnSeries())
                series.dataFields.categoryX = "post";
                series.dataFields.valueY = "count";


                /*-------------------- Диаграмма -------------------------*/

                let pieChart = am4core.create(this.$refs.piechartdiv, am4charts.PieChart)
                pieChart.innerRadius = am4core.percent(50);
                pieChart.data = dataSubdivisions

                let pieSeries = pieChart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = "count"
                pieSeries.dataFields.category = "subdivision"

                pieSeries.slices.template.stroke = am4core.color("#fff")
                pieSeries.slices.template.strokeWidth = 2
                pieSeries.slices.template.strokeOpacity = 1

                pieSeries.hiddenState.properties.endAngle = -90
                pieSeries.hiddenState.properties.startAngle = -90

                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;


                pieSeries.slices.template.tooltipText = ""


                pieChart.legend = new am4charts.Legend()
                pieChart.legend.position = "right"

                this.chart = chart
                this.pieChart = pieChart

                /*--------------------- График ------------------------------*/

                let lineChart = am4core.create(this.$refs.linechartdiv, am4charts.XYChart)

                let data = [];
                let value1 = 50;
                let value2 = 30;

                for(let i = 0; i < 300; i++){
                    let date = new Date()
                    date.setHours(0,0,0,0)
                    date.setDate(i)
                    value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
                    value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
                    data.push({date:date, value1: value1, value2: value2})
                }

                lineChart.data = data;


                let dateAxis = lineChart.xAxes.push(new am4charts.DateAxis())
                dateAxis.renderer.minGridDistance = 60;

                let valueAxisLine = lineChart.yAxes.push(new am4charts.ValueAxis())


                let seriesLine1 = lineChart.series.push(new am4charts.LineSeries())
                seriesLine1.dataFields.valueY = "value1"
                seriesLine1.dataFields.dateX = "date"
                seriesLine1.tooltipText = "{value1}"
                seriesLine1.tensionX = 1;
                seriesLine1.strokeWidth = 3;
                seriesLine1.name = "Серия 1"

                let seriesLine2 = lineChart.series.push(new am4charts.LineSeries())
                seriesLine2.dataFields.valueY = "value2"
                seriesLine2.dataFields.dateX = "date"
                seriesLine2.tooltipText = "{value2}"
                seriesLine2.name = "Серия 2"

                seriesLine1.tooltip.pointerOrientation = "vertical"

                lineChart.cursor = new am4charts.XYCursor()
                lineChart.cursor.snapToSeries = seriesLine1
                lineChart.cursor.xAxis = dateAxis


                lineChart.scrollbarX = new am4core.Scrollbar()

                lineChart.legend = new am4charts.Legend();



                /*------------------ График с закрашенными областями ------------*/

                let stackedChart = am4core.create(this.$refs.stackedchartdiv, am4charts.XYChart)


            })

        },

        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }

            if (this.pieChart) {
                this.pieChart.dispose()
            }
        }
    }
</script>

<style scoped>

    .chart {
        margin-top: 70px;
        width: 100%;
        height: 300px

    }
</style>
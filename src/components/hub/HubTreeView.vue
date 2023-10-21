<template>
    <div>
        <div>
            <div class="my-2 p-3 px-6 bg-slate-700 text-white font-semibold rounded">
                <!-- show data -->
                <div class="flex justify-between">
                    <div class="flex space-x-3 items-center">
                        <div>
                            Level:{{ data.Level }}
                        </div>
                        <div>
                            Name:{{ data.Name }}
                        </div>

                    </div>
                    <div class="flex justify-between p-2">
                        <div class="flex items-center space-x-2">
                            <label class="uppercase tracking-wide text-xs font-bold" for="debug">
                                Debug:
                            </label>
                            <div class="relative">
                                <select
                                    class=" appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="debug" v-bind:value="data.Debug">
                                    <option value="0">None</option>
                                    <option value="1">Basic</option>
                                    <option value="2">Full</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            <div class="px-2 pt-1">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input v-bind:checked="data.Enabled" type="checkbox" class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-500 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button @click="showChart"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                            <font-awesome-icon :icon="['fa', 'chart-bar']" />
                        </button>
                    </div>
                </div>
                <!-- chart -->
                <div v-if="chartEnabled" class="w-full">
                    <highCharts :options="chartOptions"></highCharts>
                </div>
                <!-- show data -->
                <div class="flex justify-between p-2 text-sm space-x-3">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        v-if="data.Children.length > 0" @click="showHide()">
                        <div v-if="!nodeIsShow">
                            <font-awesome-icon :icon="['fas', 'angle-double-down']" />
                        </div>
                        <div v-if="nodeIsShow">
                            <font-awesome-icon :icon="['fas', 'angle-double-up']" />
                        </div>
                    </button>
                    <div class="flex">
                        Bandwith: <div class="text-green-400">{{ data.Bandwidth }}</div>
                    </div>
                    <div class="flex">
                        Pending Volume: <div class="text-red-400">{{ data.PendingVolume }}</div>
                    </div>
                    <div class="flex">
                        Received Speed: <div class="text-green-400">{{ data.ReceivedSpeed }}</div>
                    </div>
                    <div class="flex">
                        Processed Speed: <div class="text-green-400">{{ data.ProcessedSpeed }}</div>
                    </div>
                    <div class="flex">
                        Pending Count: <div class="text-red-400">{{ data.PendingCount }}</div>
                    </div>

                </div>
            </div>
            <div v-if="data.Group && data.Parent.Group == data.Group" class="w-full ml-6">{{ data.Group }}</div>
            <div v-if="nodeIsShow">
                <div v-if="data.Children != null && data.Children.length > 0" class="border-l-8">
                    <hub-tree-view class="ml-6" v-for="( item, index ) in  data?.Children " :key="index" :data="item"
                        :isShow="!nodeIsShow">
                    </hub-tree-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
    name: "HubTreeView",
    components: {
        highCharts: Chart
    },
    props: {
        data: Object,
        isShow: Boolean,
        isChartEnable: Boolean,
        group: String,
        stats: Object,
    },
    data() {
        return {
            nodeIsShow: this.isShow,
            chartEnabled: this.isChartEnable,
            chartDataLocal: [],
            counting: 0,
            chartOptions: {
                chart: {
                    style: {
                        color: "#ffffff",
                        height: "300px",
                        width: "100%"
                    },
                    backgroundColor: '#262626',
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    lineColor: '#ffffff',
                    tickColor: '#00ff00',
                    tickPositions: [0, 300, 600, 900, 1200], // Adjusted tick positions for 5 minutes interval (300 seconds = 5 minutes)

                    labels: {
                        style: {
                            color: '#ffffff',
                            font: '11px Trebuchet MS, Verdana, sans-serif'
                        },
                        formatter: function () {
                            const minutes = Math.floor(this.value / 60); // Convert seconds to minutes
                            const seconds = this.value % 60; // Remaining seconds

                            return `${minutes}m ${seconds}s`;
                        }
                    },
                    title: {
                        style: {
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                        }
                    }
                },
                yAxis: {
                    lineColor: '#black',
                    tickColor: '#000',
                    visible: false,
                    labels: {
                        style: {
                            color: '#ffffff',
                            font: '11px Trebuchet MS, Verdana, sans-serif',
                            display: 'none'
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                        }
                    }
                },
                series: [{

                    data: [],
                    showInLegend: false, // sample data,
                    color: "#00ff00",
                    name: 'Bandwidth',
                    type: 'line', // Loại biểu đồ đường
                    pointStart: 0, // Điểm bắt đầu của dữ liệu
                    pointInterval: 1, // Khoảng cách giữa các điểm dữ liệu
                    marker: {
                        enabled: false // Tắt hiển thị điểm dữ liệu
                    }
                }]
            },
        }
    },
    created() {
        for (var i = 0; i < 1200; i++) {
            this.chartOptions.series[0].data.push(null);
        }
        // setInterval(this.chartData.push(this.data.Bandwidth), 2000)
    },
    methods: {
        showHide() {
            this.nodeIsShow = !this.nodeIsShow
        },
        showChart() {
            this.chartEnabled = !this.chartEnabled
        },
        updateChartData(newBandwidth) {
            this.counting++;

            if (this.counting < 1800) {
                this.chartOptions.series[0].data[this.counting] = newBandwidth;
            } else {
                this.chartOptions.series[0].data.push(newBandwidth);
                this.chartOptions.series[0].data.shift();
            }
        }
    },
    computed: {
        dataValue() {
            return this.data;
        }
    },
    watch: {
        data: {
            handler(newData) {
                this.updateChartData(newData.Bandwidth);
            },
            deep: true
        }
    },
}
</script>

<template>
    <div class="container pl-10 pt-5">
        <div class="flex justify-center ">
            <div>
                <h1 class="text-6xl p-2 bg-slate-500 rounded text-white font-semibold">Hub Monitor</h1>
            </div>
        </div>
        <div class="flex">
            <div class="ml-4 w-screen">
                <div role="status" class="w-screen justify-center items-center" v-if="isLoading">
                    <svg aria-hidden="true"
                        class="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div>
                    <hub-tree-view v-if="structData" :data="structData" :isShow="!nodeIsShow"></hub-tree-view>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import HubTreeView from "../components/hub/HubTreeView.vue"
import hubService from "@/service/hub.service";

export default {
    name: 'HubDashboard',
    components: {
        HubTreeView,
    },
    props: {
        isShow: Boolean,
        isChartEnable: Boolean,
    },
    data() {
        return {
            structList: [],
            statsList: Array,
            //stats code
            BANDWIDTH: 1 << 0,
            PENDING_VOLUME: 1 << 1,
            RECEIVED_SPEED: 1 << 2,
            PROCESSED_SPEED: 1 << 3,
            PENDING_COUNT: 1 << 4,
            STATUS: 1 << 5,
            DEBUG: 1 << 6,
            CHILDREN: 1 << 7,
            structData: null,

            isLoading: Boolean,

            nodeIsShow: this.isShow,
            chartEnabled: this.isChartEnable,
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
                tooltip: {
                    enabled: false
                },
                xAxis: {
                    lineColor: '#ffffff',
                    tickColor: '#green',

                    labels: {
                        style: {
                            color: '#ffffff',
                            font: '11px Trebuchet MS, Verdana, sans-serif'
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
                    data: [1, 2, 3],
                    showInLegend: false, // sample data,
                    color: "green"
                }]
            },
        }
    },
    render() {
        if (this.structData === null) {
            // Handle the case when structData is null
            return null; // or you can show a loading indicator or an error message
        }

        // Render the component normally when structData is not null
        // Access the structData properties without any issues
        return (
            this.fetchGetStruct()
        )
    },

    methods: {
        initializeData(arr) {
            return new StructData(null, {
                Level: "Hub",
                Name: "Hub",
                DataKey: "Hub",
                DataMask: this.CHILDREN,
                Children: arr,
            });
        },
        fetchGetStats() {
            hubService.getStats().then(response => {
                this.statsList = JSON.parse(response.SResult.D);

                if (this.structData) {
                    this.structData.update(this.statsList);
                }
            });
        },
        fetchGetStruct() {
            hubService.getStruct().then(response => {
                this.isLoading = true;
                if (response) {
                    this.structList = response;
                    this.structData = this.initializeData(this.structList);
                    this.fetchGetStats()
                } else {
                    console.log('error getstruct')
                }
                this.isLoading = false;
            });
        },
        showHide() {
            this.nodeIsShow = !this.nodeIsShow
        },
        showChart() {
            this.chartEnabled = !this.chartEnabled
        }
    },
    created() {
        this.fetchGetStruct()
        setInterval(this.fetchGetStats, 2000);
    },
    watch() {
        this.structData
    }

};

const BANDWIDTH = 1 << 0;
const PENDING_VOLUME = 1 << 1;
const RECEIVED_SPEED = 1 << 2;
const PROCESSED_SPEED = 1 << 3
const PENDING_COUNT = 1 << 4;
const STATUS = 1 << 5;
const DEBUG = 1 << 6;
const CHILDREN = 1 << 7;

class StructData {
    constructor(parent, cfg) {
        // ??
        this.BANDWIDTH = 1 << 0
        this.PENDING_VOLUME = 1 << 1;
        this.RECEIVED_SPEED = 1 << 2;
        this.PROCESSED_SPEED = 1 << 3
        this.PENDING_COUNT = 1 << 4;
        this.STATUS = 1 << 5;
        this.DEBUG = 1 << 6;
        this.CHILDREN = 1 << 7;
        //

        this.Parent = parent;
        this.Level = cfg.Level;
        this.Group = cfg.Group;
        this.Name = cfg.Name;
        this.DataKey = cfg.DataKey;
        this.DataMask = cfg.DataMask;

        this.HasBandwidth = (this.DataMask & BANDWIDTH) > 0;
        this.HasPendingVolume = (this.DataMask & PENDING_VOLUME) > 0;
        this.HasReceivedSpeed = (this.DataMask & RECEIVED_SPEED) > 0;
        this.HasProcessedSpeed = (this.DataMask & PROCESSED_SPEED) > 0;
        this.HasPendingCount = (this.DataMask & PENDING_COUNT) > 0;
        this.HasStatus = (this.DataMask & STATUS) > 0;
        this.HasDebug = (this.DataMask & DEBUG) > 0;
        this.HasChildren = (this.DataMask & CHILDREN) > 0;
        this.SumupDataMask = this.DataMask;
        this.Enabled = false;
        this.Debug = 0;
        //

        this.Children = [];
        if (this.HasChildren && cfg.Children != null) {
            // if (!this.Children) {
            for (let i = 0; i < cfg.Children.length; i++) {
                let child = new StructData(this, cfg.Children[i]);
                this.Children.push(child);
                this.SumupDataMask = this.SumupDataMask | child.SumupDataMask;
            }
        }

        this.HasSumupBandwidth = (this.SumupDataMask & BANDWIDTH) > 0;
        this.HasSumupPendingVolume = (this.SumupDataMask & PENDING_VOLUME) > 0;
        this.HasSumupReceivedSpeed = (this.SumupDataMask & RECEIVED_SPEED) > 0;
        this.HasSumupProcessedSpeed = (this.SumupDataMask & PROCESSED_SPEED) > 0;
        this.HasSumupPendingCount = (this.SumupDataMask & PENDING_COUNT) > 0;

        this.Bandwidth = 0;
        this.PendingVolume = 0;
        this.ReceivedSpeed = 0;
        this.ProcessedSpeed = 0;
        this.PendingCount = 0;
    }

    update(stats) {
        if (this.Parent == null) {
            stats = { Children: stats };
        }

        this.Bandwidth = 0;
        this.PendingVolume = 0;
        this.ReceivedSpeed = 0;
        this.ProcessedSpeed = 0;
        this.PendingCount = 0;

        if (this.HasBandwidth) this.Bandwidth = stats.Bandwidth;
        if (this.HasPendingVolume) this.PendingVolume = stats.PendingVolume;
        if (this.HasReceivedSpeed) this.ReceivedSpeed = stats.ReceivedSpeed;
        if (this.HasProcessedSpeed) this.ProcessedSpeed = stats.ProcessedSpeed;
        if (this.HasPendingCount) this.PendingCount = stats.PendingCount;

        if (this.HasStatus) this.Enabled = stats.Enabled;
        if (this.HasDebug) this.Debug = stats.Debug;

        if (this.HasChildren) {
            for (let i = 0; i < stats.Children.length; i++) {
                let childStats = stats.Children[i];
                let child = this.Children[i];
                child.update(childStats);

                if (child.HasSumupBandwidth) this.Bandwidth += child.Bandwidth;
                if (child.HasSumupPendingVolume) this.PendingVolume += child.PendingVolume;
                if (child.HasSumupReceivedSpeed) this.ReceivedSpeed += child.ReceivedSpeed;
                if (child.HasSumupProcessedSpeed) this.ProcessedSpeed += child.ProcessedSpeed;
                if (child.HasSumupPendingCount)
                    this.PendingCount += child.PendingCount;
            }
        }
    }

    getChartData() {
        if (this.HasSumupBandwidth) {
            return { time: new Date(), value: this.Bandwidth };
        }
        else if (this.HasSumupProcessedSpeed) {
            return { time: new Date(), value: this.ProcessedSpeed };
        }
        else if (this.HasSumupReceivedSpeed) {
            return { time: new Date(), value: this.ReceivedSpeed };
        }
        else return null;
    }

    getPath() {
        let current = this;
        let path = {};
        while (current.Parent != null) {
            path[current.Level] = current.DataKey;
            current = current.Parent;
        }
        return path;
    }

}

</script>
  
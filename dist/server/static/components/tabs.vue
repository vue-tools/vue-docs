<template>
    <vt-tabs v-model="currentTab" @tab-click="TabClick" v-if="exist">
        <vt-tabs-item v-if="data.props">
            <span class="title" slot="title">Props</span>
            <vk-docs-props :props="data.props"></vk-docs-props>
        </vt-tabs-item>
        <vt-tabs-item v-if="data.slots">
            <span class="title" slot="title">Slots</span>
            <vk-docs-slots :slots="data.slots"></vk-docs-slots>
        </vt-tabs-item>
        <vt-tabs-item v-if="data.events">
            <span class="title" slot="title">Events</span>
            <vk-docs-events :events="data.events"></vk-docs-events>
        </vt-tabs-item>
    </vt-tabs>
</template>

<script>
    import { Tabs, TabItem } from 'vt-tabs'
    import { Props, Events, Slots } from 'vuikit-docs'
    
    export default {
        props: {
            data: Object
        },
        computed: {
            exist() {
                let { props, slots, events } = this.data || {}

                return props || slots || events
            }
        },
        methods: {
            TabClick(index){
                this.currentTab = index
            }  
        },
        data(){
            return {
                currentTab: 0
            }
        },
        components: {
            'vt-tabs': Tabs,
            'vk-docs-props': Props,
            'vk-docs-slots':  Slots,            
            'vt-tabs-item': TabItem,
            'vk-docs-events': Events
        }
    }
</script>
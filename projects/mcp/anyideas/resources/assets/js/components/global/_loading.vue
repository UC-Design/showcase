<template>
    <span class="loading">
        <lottie :options="defaultOptions" :height="120" :width="120" v-on:animCreated="handleAnimation"/>
    </span>
</template>

<style lang="scss">
@import '~@/App.scss';

.loading {
    position: relative;
    display: grid;
    align-content: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    line-height: 1rem;
    margin: 0 auto;
    > div {
        display: flex;
        width: 120px !important;
        height: 120px !important;
    }
}
</style>

<script>
    import Lottie from 'vue-lottie';
    import * as animationData from '../../data/lottie/loading.json';
    export default {
        name: 'Loading',
        components: {
            'lottie': Lottie
        },
        data() {
            return {
                defaultOptions: {
                    animationData: animationData,
                    autoplay: true,
                    renderer: 'svg',
                    loop: true,
                },
                animationSpeed: 1
            }
        },
        // figure out passing MySQL data to Vue
        mounted() {
            console.log('Loading.vue mounted');
        },
        methods: {
            handleAnimation: function (anim) {
                this.anim = anim;
            },
        
            stop: function () {
                this.anim.stop();
            },
        
            play: function () {
                this.anim.play();
            },
        
            // pause: function () {
            //     this.anim.pause();
            // }
        }

    }
</script>
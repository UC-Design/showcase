<template>
    <div class="card-container" >
        <div class="card-wrapper" id="header">
            <div>
                <h2 class="title">
                    {{this.props}}
                </h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '~@/App.scss';

.card-container {
    background-color: rgba(221, 221, 221, .95);
    &:hover {
        transition: .5s;
        background-color: rgba(252,176,69,.95);
    }
}

.card-wrapper {
    height: 198px;
    transition: .5s;
    // border-bottom: 10px solid white;
    &:hover {
        transition: .5s;
        animation: lv 1250s linear infinite;
        box-shadow:inset 0px 0px 0px 10px #222;
        @keyframes lv {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 40000px 0;
            }
        }
    }
    div {
        height: 100%;
        display: grid;
        align-content: center;
        justify-content: center;
        text-decoration: none;
        .title {
            padding: 8px 16px;
            background-color: white;
            color: $p-color;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
        }
    }
}

</style>

<script>
import * as hero from 'hero-patterns'
    export default {
        name: 'CategoryCard',
        props: ['props'],
        data() {
            return {
                categoryData: null,
                categoryBackground: null
            }
        },
        watch: {
            '$route': ['setBackground']
        },
        mounted() {
            // console.log('CategoryCard.vue mounted (this) => ', this);
            // console.log('CategoryCard.vue mounted (this.props) => ', this.props)z;
            this.setBackground();
        },
        methods: {
            setBackground() {
                this.categoryData = '#' + this.props.toLowerCase();
                // this.categoryBackground = this.$ud_store.state.svgBackground[this.props.toLowerCase()];
                document.querySelector('#header').style.backgroundImage = hero[this.$ud_store.state.svgBackground[this.props.toLowerCase()]]('#222');
            }
        }
    }
</script>
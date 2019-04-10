<template>
    <div class="step step-1">
        <blockquote>
            <p>“If you always do what interests you, at least one person is pleased”</p>
            <cite>KATHARINE HEPBURN</cite>
        </blockquote>
        <div class="interest-selector">
            <p><strong>Select Your Interests</strong> (max. of 3)</p>
            <ul class="categories">
                <li
                    v-for="cat in categories"
                    :key="cat"
                    v-on:click="onChange(cat)"
                    v-bind:class="{active : interests.indexOf(cat) !== -1}"
                >{{ cat }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~@/_variables.scss';
    .interest-selector {
        text-align: center;
        p {
            margin-top: 60px;
        }
        .categories {
            list-style: none;
            margin: 30px 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            li {
                font-size: 12px;
                margin: 0 5px 5px;
                color: $primary;
                font-weight: $w-bold;
                padding: 6px 17px;
                border-radius: 200px;
                background: rgba($primary, 0.05);
                text-transform: capitalize;
                cursor: pointer;
                user-select: none;
                transition: all 300ms ease-in-out;
                &.active {
                    background: $primary;
                    color: white;
                }
            }
        }
    }
</style>


<script>
    import categories from '../../data/categories'
    export default {
        name: 'RegisterInterests',
        props: ['interests'],
        data() {
            return {
                categories: categories
            }
        },
        methods: {
            onChange(cat) {
                this.$emit('onpush', cat)
            }
        }
    }
</script>

<template>
  <div class="fixed_width">
    <section class="categories">
      <div class="categories_wrapper">
        <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
          <ul>
            <li v-for="(value, key) in this.$ud_store.state.categories" :key="key">
              <router-link :to="`/category/${value.toLowerCase()}`" key={{key}}>{{value}}</router-link>
            </li>
          </ul>
        </VuePerfectScrollbar>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  @import '~@/App.scss';
    .categories {
        width: 100%;
        /* overflow-x: scroll; */
        .categories_wrapper {
            margin: 0;
            border-bottom: 1px solid $black;
            ul {
                display: flex;
                justify-content: space-between;
                list-style-type: none;
                padding: 0;
                margin: 16px 0;
                li {
                    margin: 0 16px;
                    white-space: nowrap;
                    display: flex;
                    font-size: 14px;
                    a {
                        text-transform: uppercase;
                        text-decoration: none;
                        color: $p-color;
                        &.router-link-exact-active {
                          font-weight: $w-bold;
                        }
                    }
                }
            }
        }
    }

</style>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    export default {
        name: 'CategoriesSlider',
        components: {
          VuePerfectScrollbar
        },
        data() {
          return {
            settings: {
              maxScrollbarLength: 60
            }
          }
        },
        methods: {
          scrollHanle(evt) {
            console.log(evt)
          }
        }
    }
</script>
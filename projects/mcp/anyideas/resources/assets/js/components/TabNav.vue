<template>
    <nav class="tab-nav-container fixed_width" >
      <div class="tab-nav-wrapper" v-bind:style="{ gridTemplateColumns: 'repeat(' + propsLength + ', 1fr)'}"> 
        <router-link
          :to="{ name: props[key].id, params: $route.params }"
          v-bind:class="{ active: value.active }"
          v-for="(value, key) in props"
          :key="props[key].id"
        >
          <div class='tab-nav-item'  >
          <!-- <router-link :to="props[key].route"> -->
            {{props[key].label}}
          </div>
        </router-link>
      </div>
    </nav>
</template>

<style lang="scss" scoped>
  @import '~@/_variables.scss';
  .tab-nav-container {
    /* width: 100%; */
    min-height: 75px;
    margin: 0 auto;
    .tab-nav-wrapper {
      width: 100%;
      display: grid;
      align-items: center;
      a {
        text-align: center;
        padding: 24px 0;
        text-decoration: none;
        color: $black-light;
        text-transform: uppercase;
      }
      // .router-link-active,
      .active {
        border-bottom: 2px solid black;
        font-weight: $w-bold;
      }
    }
  }
</style>

<script>
    export default {
        name: 'TabNav',
        props: [ 'props' ],
        data() {
            return {
              navData: null,
              propsLength: this.props.length
            }
        },
        watch: {
          $route: ["setData"]
        },
        beforeMount: function() {
          this.setData();
        },
        methods: {
          setData() {
            this.navData = this.props;
          }
        }
    }
</script>
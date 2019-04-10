<template>
    <div class="no-ideas-found">
        <span v-html="this.$ud_store.state.icons.tumbleweed" />
        <h2>Any ideas where these ideas are?</h2>
        <router-link :to="{name: 'index'}" class="btn">Discover ideas</router-link>
    </div>
</template>

<style lang="scss" scoped>
  @import '~@/_variables.scss';
  .no-ideas-found {
    text-align: center;
    span {
      max-width: 200px;
      display: block;
      margin: 0 auto;
    }
    h2 {
      margin: 30px 0 10px;
    }
    .btn {
      color: white;
      font-weight: $w-bold;
      background: $primary;
      padding: 10px 30px;
      border-radius: 200px;
      text-transform: capitalize;
      text-decoration: none;
      display: inline-block;
      transition: background 250ms ease-in-out;
      &:hover {
        background: lighten($primary, 10%);
      }
    }
  }
</style>

<style lang="scss">
  @import '~@/_variables.scss';
  .no-ideas-found {
    span {
      svg * {
        fill: $grey-med !important;
      }
    }
  }
</style>

<script>
    export default {
        name: 'NoIdeas'
    }
</script>
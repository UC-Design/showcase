<template>
  <section class="user-ideas">
    <div class="idea_wrapper">

        <template v-if="!userIdeas">
          <template v-if="isCurrentUsersProfile">
            <div class="no-ideas">
              <span v-html="this.$ud_store.state.icons.profile_no_ideas" />
              <h2>Share your ideas now</h2>
              <router-link :to="{name: 'add-new-idea'}" class="btn btn-new">Post Idea</router-link>
            </div>
          </template>
          <template v-else>
            <noideas />
          </template>
        </template>

        <template v-else>
          <div class="all-ideas">
            <IdeaCard v-for="(value, key) in userIdeas" :key="key" :props='value'/>
          </div>
        </template>

    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '~@/_variables.scss';
  .no-ideas-found,
  .all-ideas {
    margin-top: 60px;
  }
  .no-ideas {
    margin-top: 60px;
    text-align: center;
    span {
      max-width: 400px;
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
  .no-ideas {
    span {
      svg g * {
        stroke: $grey-med !important;
      }
    }
  }
</style>

<script>
  import IdeaCard from '../IdeaCard.vue'
  
  export default {
    name: 'Ideas',
    components: {
      IdeaCard
    },
    computed: {
      userIdeas() {
        return this.$ud_store.getters.getUserIdeas
      },
      isCurrentUsersProfile() {
        let user = this.$ud_store.getters.getUserData
        
        if (user !== null) {
          if (parseInt(user.id) === parseInt(this.$route.params.id)) {
            return true;
          }
        }

        return false
      }
    }
  }
</script>
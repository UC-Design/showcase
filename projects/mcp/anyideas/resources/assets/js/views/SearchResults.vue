<template>
    <div class="search_container">
        <div v-if="loaded" class="fixed_width">
            <div v-if="this.users !== []" class="users_results">
              <h2>Users</h2>
              <div class="user_item" v-for="(value, key) in users" :key="key">
                <router-link :to="'/user/' + value.user.id">
                  <div class="profile-image-wrapper">
                    <div class="profile-image" :style="{ 'background-image': `url(${value.meta.user_meta.avatar})` }"></div>
                  </div>

                  <div class="profile-information">
                    <span class="username">@{{value.user.username}}</span>
                    <div class="name">
                        <template >
                            <h1>{{value.user.name}}</h1>
                        </template>
                    </div>
                    <ul v-if="value.meta.social_media" class="social-media">
                        <li v-if="value.meta.social_media.facebook">
                            <a :href="value.meta.social_media.facebook" target="_blank" rel="noopener noreferrer" v-html="$ud_store.state.icons.social.facebook" />
                        </li>
                        <li v-if="value.meta.social_media.instagram">
                            <a :href="value.meta.social_media.instagram" target="_blank" rel="noopener noreferrer" v-html="$ud_store.state.icons.social.instagram" />
                        </li>
                        <li v-if="value.meta.social_media.youtube">
                            <a :href="value.meta.social_media.youtube" target="_blank" rel="noopener noreferrer" v-html="$ud_store.state.icons.social.youtube" />
                        </li>
                    </ul>
                  </div>
                </router-link>
              </div>
            </div>

            <div v-else class="users_results">
              <h2>Users</h2>
              <div class="no_results">
                <p>no users found</p>
              </div>
            </div>

            <div v-if="this.ideas !== []" class="ideas_results">
              <h2>Ideas</h2>
              <div v-for="(value, key) in this.ideas" :key="key">
                <IdeaCard key={{key}} :props='value'/>
              </div>
            </div>

            <div v-else class="ideas_results">
              <h2>Ideas</h2>
              <div class="no_results">
                <p>no ideas found</p>
              </div>
            </div>
            
        </div>
        <div>
          <h2>Enter your search above</h2>
        </div>
    </div>
</template>

<style lang="scss">
@import '~@/App.scss';
.profile-image-wrapper {
  position: relative;
  .profile-image {
      min-width: 175px;
      min-height: 175px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      border-radius: 50%;
  }
}
.profile-information {
    margin-left: 40px;
    .username {
        font-size: 0.9em;
        color: rgba($black, 0.5);
    }
    .name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        h1 {
            border-bottom: 2px solid transparent;
        }
        h1, input[name="name"] {
            margin: 0;
            line-height: 1.2;
            font-size: 2.3em;
        }
    }
    .social-media {
        margin: 7px 0 0;
        padding: 0;
        list-style: none;
        &:after {
            content: '';
            clear: both;
            display: table;
        }
        li {
            float: left;
            margin-right: 15px;
            a, svg {
                display: block;
                width: 21px;
                height: 21px;
            }
        }
    }
}


.user_item {
  /* margin: 48px auto; */
  &:hover {
    background-color: $white;
  }
  > a {
    display: flex;
    text-decoration: none;
    padding: 48px;
  }
}
.search_container {
  padding: 0 64px;
}
.users_results, .ideas_results {
  padding: 48px;
}
</style>

<script>
import IdeaCard from '../components/IdeaCard'
  export default {
    name: 'SearchResults',
    components: {
      IdeaCard
    },
    data() {
      return {
        currentRoute: this.$route.params.id,
        loaded: false,
        ideas: [],
        users: []
      }
    },
    computed: {
        currentSearchData() {
          return this.$ud_store.getters.getCurrentSearch;
        },
    },
    beforeMount() {
      if (this.currentSearchData !== '') {
        this.getSearchResults();
      }
    },
    mounted() {
      // this.ideas = this.$ud_store.state.current_search.ideas.slice(1,3);
      // this.users = this.$ud_store.state.current_search.users;
    },
    watch: {
      currentSearchData() {
        console.log('currentSearchData watcher', this.currentSearchData)
        if (this.currentSearchData === '') {
          this.getSearchResults('luke');
        }
        
      },
      // $route() {
      //   this.getSearchResults();
      // }
    },
    methods: {
      getSearchResults(val) {
        let searchThis = this.currentSearchData;
        console.log('val', val)
        console.log('searchThis', searchThis)
        if (val === 'luke') {
          searchThis = 'luke'
        }
        console.log('searchThis', searchThis)
        this.loaded = false;
        console.log('this.currentSearchData => ', this.currentSearchData)
          axios({
              method: 'POST',
              url: '/ai/search',
              data: {
                  search: this.currentSearchData
              },
              headers: {
                  'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
              }
          })
          .then(res => {
              let user_array = [];

              for (let i = 0; i < res.data.usersQuery.length; i++ ) {
                  axios({
                      method: 'POST',
                      url: '/ai/user/get/' + res.data.usersQuery[i].id,
                      headers: {
                          'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                      }
                  }).then(u_res => {
                      let addToAll = {
                          user: res.data.usersQuery[i],
                          meta: u_res.data
                      }
                      user_array.push(addToAll)
                  })
              }
              console.log('(all) user_array => ', user_array)

              this.ideas = res.data.ideasQuery;
              this.users = user_array;

              this.$ud_store.commit('SET_CURRENT_SEARCH_QUERY', '');
              console.log('this.currentSearchData => ', this.currentSearchData)
              this.loaded = true;
          })
          .catch(error => {
              console.error(error);
          });
      }
    }
  }
</script>
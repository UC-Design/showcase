<template>
  <section class="about fixed_width">
    <div class="idea_wrapper">
      <div class="user_stats">
        <div>
          <h2>{{ countIdeas }}</h2>
          <h3>ideas</h3>
        </div>
        <div>&nbsp;&#8226;&nbsp;</div>
        <div>
          <h2>{{ countFollowers }}</h2>
          <h3>followers</h3>
        </div>
      </div>

      <div class="interests-wrapper" v-if="userMeta && userMeta.interests">
        <h3>Interests
          <template v-if="showEditingControls">
            <template v-if="!editing_interests">
              <a href="#edit-interests" @click="toggleEditing"><span v-html="this.$ud_store.state.icons.edit" /></a>
            </template>
            <template v-else>
              <a href="#edit-interests" @click="toggleEditing"><span v-html="this.$ud_store.state.icons.x" /></a>
              <a href="#save-interests" @click="saveInterests"><span v-html="this.$ud_store.state.icons.check" /></a>
            </template>
          </template>
        </h3>
        <ul class="interests" :class="{ editing: editing_interests }">
          <template v-if="!editing_interests">
            <li v-for="interest in userMeta.interests" :key="interest">
              <router-link :to="`/category/${interest}`">{{interest}}</router-link>
            </li>
          </template>
          <template v-else>
            <li v-for="category in categories" :key="category">
              <a href="#select-interest" :class="{ active: interests.indexOf(category) > -1 }" @click="onInterestClick($event, category)">{{ category }}</a>
            </li>
          </template>
        </ul>
      </div>

      <div class="bio-wrapper">
        <h3>Bio
          <template v-if="showEditingControls">
            <template v-if="!editing_bio">
              <a href="#edit-interests" @click="toggleBioEditing"><span v-html="this.$ud_store.state.icons.edit" /></a>
            </template>
            <template v-else>
              <a href="#edit-interests" @click="toggleBioEditing"><span v-html="this.$ud_store.state.icons.x" /></a>
              <a href="#save-interests" @click="saveUserBio"><span v-html="this.$ud_store.state.icons.check" /></a>
            </template>
          </template>
        </h3>

        <template v-if="editing_bio">
          <markdown-editor v-model="bio" ref="markdownEditor" :configs="configs"></markdown-editor>
        </template>
        
        <template v-if="!editing_bio && userHasBio">
          <div class="editor-contents" v-html="userBio" />
        </template>

        <div v-if="!showEditingControls && !userHasBio" class="no-bio">
          <span v-html="this.$ud_store.state.icons.no_bio" />
          <h2>Definitely still writing.</h2>
        </div>
      </div>

    </div>
    
  </section>
</template>

<style lang="scss">
@import '~@/_variables.scss';
@import '~@/components/_viewer.scss';

.user_stats {
  width: 250px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr .2fr 1fr;
  align-items: center;
  justify-content: center;
  > * {
    text-align: center;
    margin: 0 auto;
  }
  h2 {
    margin-top: 0;
  }
  h3 {
    font-weight: $w-regular;
    text-transform: capitalize;
    color: $grey-dark;
    margin: 0;
  }
}
.interests {
  margin: 0 auto 68px;
  h3 {
    text-align: center;
  }
  > div {
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: center;
    button {
      margin: 0 4px;
    }
  }
}
.bio-wrapper {
  .no-bio {
    span {
      svg g * {
        stroke: $grey-med !important;
      }
    }
  }
}
/* .about {
  .about-wrapper {
    max-width: 760px;
    margin: 0 auto; 
  }
} */

</style>

<style lang="scss" scoped>
  @import '~@/_variables.scss';
  @import '~simplemde/dist/simplemde.min.css';

  .about {
    > .idea_wrapper {
      padding-top: 60px;
    }
  }
  .interests-wrapper,
  .bio-wrapper {
    margin-top: 60px;
    h3 {
      margin: 0 0 25px;
      display: inline-flex;
      align-items: center;
      > a {
        margin-left: 10px;
        width: 20px;
        height: 20px;
        color: $black;
      }
    }
  }
  .interests-wrapper {
    text-align: center;
    .interests {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0 7px 7px 0;
        font-size: 1em;
        &:last-child {
          margin-right: 0;
        }
        a {
          color: white;
          font-weight: $w-bold;
          background: $black;
          padding: 10px 30px;
          border-radius: 200px;
          text-transform: capitalize;
          text-decoration: none;
          display: block;
          transition: background 250ms ease-in-out, color 250ms ease-in-out;
          border: 1px solid $black;
          &:hover {
            background: lighten($black, 20%);
          }
        }
      }
      &.editing {
        li {
          a:not(.active) {
            background: $pure;
            color: $black;
          }
        }
      }
    }
  }
  .bio-wrapper {
    h3 {
      justify-content: center;
      display: flex;
    }
    .no-bio {
      text-align: center;
      span {
        max-width: 250px;
        display: block;
        margin: 0 auto;
      }
      h2 {
        margin: 30px 0 10px;
      }
    }
  }
</style>

<script>
  import categories from '../../data/categories'
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import marked from 'marked'

  export default {
    name: 'About',
    components: {
      markdownEditor
    },
    props: ['data'],
    data() {
      return {
        userOwns: false,
        loaded: false,
        editing_interests: false,
        interests: [],
        categories: categories,
        editing_bio: false,
        bio: '',
        configs: {
          hideIcons: ['image', 'link', 'preview']
        }
      }
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
      toggleEditing(e) {
        e.preventDefault();

        let state = this.editing_interests
        this.editing_interests = !state

        if (this.editing_interests === true) {
          this.interests.push(...this.userMeta.interests)
        }
        else {
          this.interests = []
        }
      },
      toggleBioEditing(e) {
        e.preventDefault();
        this.editing_bio = !this.editing_bio

        if (this.editing_bio === true) {
          this.bio = this.userMeta.user_meta ? this.userMeta.user_meta.bio : ''
        }
        else {
          this.bio = ''
        }
      },
      onInterestClick(e, cat) {
        e.preventDefault();
        let index = this.interests.indexOf(cat)

        if (index === -1) {
            this.interests.push(cat)
        }
        else {
            this.interests.splice(index, 1);
        }
      },
      saveInterests(e) {
        e.preventDefault();

        if (this.interests.length === 0) return false;
        if (!this.showEditingControls) return false;

        axios({
          method: 'POST',
          url: `/ai/user/update/${this.userMeta.user.id}`,
          data: {
            user_meta_update: {
              interests: JSON.stringify(this.interests)
            }
          }
        })
        .then(({data}) => {
          console.log('Data -> ', data)
          if (!data.success) {
              alert(data.msg);
          }
          else {
              this.$ud_store.commit('SET_USER_DATA', data.user)
              this.$ud_store.commit('SET_CURRENT_USER_INTERESTS', this.interests)
              this.toggleEditing(e)
          }
        })
        .catch(e => console.error(e))
      },
      saveUserBio(e) {
        e.preventDefault();

        if (!this.showEditingControls) return false;

        axios({
          method: 'POST',
          url: `/ai/user/update.meta/${this.userMeta.user.id}`,
          data: {
            user_meta_update: {
              bio: this.bio
            }
          }
        })
        .then(({data}) => {
          if (!data.success) {
            alert(data.msg)
            return false
          }
          else {
            let bio = data.update.bio || ''
            
            this.$ud_store.commit('SET_CURRENT_USER_BIO', data.update.bio);
            this.toggleBioEditing(e);
          }
        })
        .catch(e => console.error(e))
      }
    },
    computed: {
      userMeta() {
        return this.$ud_store.getters.getUserMeta
      },
      countIdeas() {
        return this.$ud_store.getters.getUserIdeasCount
      },
      countFollowers() {
        if (this.userMeta && this.userMeta.user_meta) {
          if (this.userMeta.user_meta.hasOwnProperty('followers')) {
            if (this.userMeta.user_meta.followers !== null) {
              let follower = JSON.parse(this.userMeta.user_meta.followers)
              return follower.length
            }
          }
        }

        return 0
      },
      showEditingControls() {
        let current_logged_in_user = this.$ud_store.getters.getUserData
        if (current_logged_in_user) {
          return parseInt(current_logged_in_user.id) === parseInt(this.$route.params.id)
        }
        else {
          return false
        }
      },
      userHasBio() {
        if (this.userMeta && this.userMeta.user_meta) {
          let meta = this.userMeta.user_meta
          if (meta.hasOwnProperty('bio')) {
            if (meta.bio !== null && typeof meta.bio !== 'undefined' && meta.bio.trim() !== '') {
              return true
            }
          }
        }

        return false;
      },
      userBio() {
        if (this.userHasBio) {
          return marked(this.userMeta.user_meta.bio, { sanitize: true })
        }
      }
    }
  }
</script>
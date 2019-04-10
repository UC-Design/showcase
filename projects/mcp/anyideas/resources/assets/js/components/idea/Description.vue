<template>
  <section class="description fixed_width">
    <template v-if="$parent.isUsersIdea">
      <markdown-editor v-model="description" :configs="configs"></markdown-editor>
      <div class="actions">
        <button class="post-idea" @click="triggerDescriptionUpdate">Update</button>
      </div>
    </template>
    <template v-else>
      <div class="editor-contents" v-html="ideaDescription" />
    </template>
  </section>
</template>

<style lang="scss">
  @import '~@/_variables.scss';
  @import '~@/components/_viewer.scss';
</style>

<style lang="scss" scoped>
  @import '~@/_variables.scss';
  @import '~simplemde/dist/simplemde.min.css';
  .description {
    margin-top: 60px;
  }

  .actions {
    margin-top: 30px;
    text-align: right;
  }

  .post-idea {
    font-size: 20px;
    background-color: $primary;
    color: $pure;
    border-radius: 200px;
    padding: 10px 30px;
    text-decoration: none;
    border: none;
    box-shadow: 0 3px 6px 0 rgba($black, 0.16);
    font-family: $font-family-sans-serif;
    &:focus {
      outline: none;
    }
  }
</style>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import marked from 'marked'

  export default {
    name: 'Description',
    components: {
      markdownEditor
    },
    data() {
      return {
        loaded: false,
        description: null,
        configs: {
          hideIcons: ['image', 'link', 'preview']
        }
      }
    },
    mounted() {
      if (this.currentIdeaDescription) {
        this.description = this.currentIdeaDescription
      }
    },
    methods: {
      triggerDescriptionUpdate(e) {
        e.preventDefault();
        this.$parent.handleUpdateIdea(this.description);
      }
    },
    computed: {
      currentIdeaData() {
        return this.$ud_store.getters.getCurrentIdea
      },
      getIdeaUserId() {
        return this.$ud_store.getters.getCurrentIdeaUserId
      },
      currentUserData() {
        return this.$ud_store.getters.getUserData
      },
      currentIdeaDescription() {
        return this.$ud_store.getters.getCurrentIdeaDescription
      },
      ideaDescription() {
        if (this.currentIdeaDescription && this.currentIdeaDescription !== null) {
          if (typeof this.currentIdeaDescription === 'string') {
            return marked(this.currentIdeaDescription, { sanitize: true })
          }
        }
      }
    },
    watch: {
      $route: function(to, from) {
        if (to.params.id !== from.params.id) {
          this.updateDescription();
        }
      },
      currentIdeaDescription: function(val) {
        if (this.description === null) {
          this.description = val
        }
      }
    }
  }
</script>
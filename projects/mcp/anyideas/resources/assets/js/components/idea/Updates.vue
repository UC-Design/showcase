<template>
  <section class="updates fixed_width">
      <div class="timeline_item_container sub_width">
        <!-- <button @click="hanldeGetUpdateData">get update_posts data from (pre filled) idea_id</button><br/><br/>    -->
    
        <div v-if="$parent.isUsersIdea" class="timeline_item timeline_add_new">
            <div class="timeline_box">
                <h5 class="timeline_date">Day / Month / Year</h5>
                <label for="update_post.title">Title</label>
                <input class="timeline_title" placeholder="Milestone Title" v-model="update_post.title" type="text" required/>
                <label for="update_post.message">Description</label>
                <textarea placeholder="Description (240 characters)" class="timeline_message" v-model="update_post.message" type="text" required/>
                <div class="timeline_item_footer">
                    <span></span>
                    <div class="total-likes" @click="handleUpdatePostSubmit">
                        <p>Post</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="getUpdatesData" id="updates_post_data">
            <p>{{getUpdatesData}}</p>
            <ul v-for="(value, key) in this.getUpdatesData" :key="key">
                <li key={{key}}>
                    <h4>{{value.title}}</h4>
                    <p>{{value.message}}</p>
                    <button @click="handleUpdatePostDelete(value.id)">Delete entry</button>
                    <button @click="handleUpdatePostDarts(value.id)">{{value.darts}}</button>
                </li>
            </ul>
        </div> -->

        <template v-if="this.currentTimelineData.length > 0">
        <div class="timeline_item" v-for="(value, key) in this.getUpdatesData" :key="key">
            <div class="timeline_box">
                <h5 class="timeline_date">{{(new Date(value.created_at).getDate()) + '/' + (new Date(value.created_at).getMonth() + 1) + '/' + (new Date(value.created_at).getFullYear())}}</h5>
                
                <h2 class="timeline_title">
                    <a v-if="value.link !== null" class="timeline_link" :href="value.link" target="_blank">{{value.title}}</a>
                    <span v-else >{{value.title}}</span>
                </h2>
                <p class="timeline_message">{{value.message}}</p>
                <div class="timeline_item_footer">
                    <span></span>
                    <!-- <span class="timeline_button" @click="handleTimelineSubmit" v-html="icons.dart"></span> -->
                    <div v-if="$parent.isUsersIdea" class="delete total-likes"  @click="handleTimelineDelete(value.id)">
                        <p>Delete</p><span v-html="icons.trash" />
                    </div>
                    <div v-else class="total-likes" @click="handleUpdatePostDarts(value.id)">
                        <p>{{ value.darts }}</p><span v-html="icons.dart" />
                    </div>
                    
                </div>
            </div>
        </div>
        </template>
        <template v-else>
            <div class="no-updates-found">
                <span v-html="this.$ud_store.state.icons.tumbleweed" />
                <h2>There hasn't been any updates events yet.</h2>
            </div>
        </template>
    </div>
  </section>
</template>

<style lang="scss">
  @import '~@/_variables.scss';
  .no-updates-found {
    text-align: center;
    span {
      max-width: 300px;
      display: block;
      margin: 0 auto;
      svg * {
        fill: $grey-med !important;
      }
    }
    h2 {
      margin: 30px 0 0;
    }
  }
</style>

<style lang="scss">
@import '~@/_variables.scss';

.timeline_item_container {
    .timeline_add_new {
        .timeline_box {
            display: grid;
            font-family: $font-family-sans-serif;
            .timeline_title {
                margin: 0 0 16px !important;
            }
            .timeline_message {
                min-height: 96px;
                max-width: 100%;
                margin-bottom: 24px;
            }
            label {
                display: none;
            }
            input, textarea {
                border: none;
                background-color: transparent;
                padding-bottom: 2px;
                border-bottom: 1px solid transparent;
                transition: .25s;
                &:focus {
                    border: none;
                    outline: none;
                    border-bottom: 1px solid $black;
                    transition: .5s;
                }
            }
        }
    }
    .timeline_item {
        display: grid;
        grid-template-columns: 1fr;
        .timeline_box {
            padding: 16px 0;
            width: 100%;
            .timeline_date {
                color: $grey-med;
                margin: 0;
                font-size: .83rem;
            }
            .timeline_title {
                position: relative;
                color: $black;
                margin: 0 0 36px;
                font-size: 1.5rem;
                font-weight: $w-bold;
                a, span {
                    color: $black;
                    font-size: 1.5rem;
                    font-weight: $w-bold;
                }
            }
            .timeline_message {
                color: $grey-dark;
                font-size: 1rem;
            }
            .timeline_item_footer {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr;
                .delete {
                    background-color: $black !important;
                    p {
                        color: $white;
                    }
                    span {
                        margin-left: 4px;
                        padding: 4px 0 4px 4px;
                        width: 10px;
                        fill: $white;
                        span svg {
                            display: block;
                        }
                    }
                }
                .total-likes {
                    justify-self: flex-end;
                    padding: 5px 15px;
                    background: white;
                    border-radius: 200px;
                    line-height: 1;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                    p {
                        margin: 0 auto;
                        padding: 4px 0;
                        flex-grow: 2;
                        font-size: .9rem;
                        font-weight: $w-bold;
                    }
                    span {
                        width: 22px;
                        span svg {
                            display: block;
                            fill: $white;
                        }
                    }
                }
                .timeline_link {
                    display: flex;
                    align-self: center;
                    justify-self: flex-start;
                    margin: 0;
                    padding: 0;
                    color: $black;
                    padding: 8px 16px;
                    margin: 0 4px;
                    border-radius: 25px;
                    background-color: $white;
                    border: none;
                    box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                    transition: .5s;
                    &:hover {
                        transition: .25s;
                        box-shadow: 0 6px 9px 0 rgba($black, 0.16);
                    }
                    span {
                        width: 12px;
                        display: flex;
                        color: $grey-med;
                        &:nth-of-type(2) {
                            cursor: pointer;
                        }
                    }
                    input {
                        margin: 0 8px;
                    }
                }
                .timeline_button {
                    align-self: center;
                    justify-self: flex-end;
                    /* border: 1px solid $black; */
                    color: $black;
                    padding: 8px 16px;
                    margin: 0 4px;
                    border-radius: 25px;
                    background-color: $white;
                    border: none;
                    box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                    cursor: pointer;
                    transition: .5s;
                    &:hover {
                        transition: .25s;
                        box-shadow: 0 6px 9px 0 rgba($black, 0.16);
                    }
                }
            }
        }
    }
}
</style>

<script>
    export default {
      name: 'Updates',
      data() {
          return {
            updates_post_data: this.getUpdatesData,
            update_post: {
              title: '',
              message: ''
            },
            update_post_create: {
              id: '',
              title: '',
              message: ''
            },
            update_post_update: {
              id: '',
              title: '',
              message: ''
            },
            icons: {
                dart: this.$ud_store.state.icons.dart,
                trash: this.$ud_store.state.icons.trash
            }
          }
      },
    computed: {
        getUpdatesData() {
            return this.$ud_store.getters.getCurrentIdeaUpdates;
        }
    },
    watch: {
        getUpdatesData: function(val) {
            if (this.viewInitialsed) return false

            // if (val.user_meta && val.user_meta.bio) {
            //     this.inititaliseViewer();
            // }
            console.log('updates_post_data => ', this.updates_post_data)
            console.log('parent.isUsersIdea => ', this.$parent.isUsersIdea)
        }
    },
    mounted() {
        console.log("%c Updates.vue", this.$ud_store.state.consoleLog.component)
        this.hanldeGetUpdateData();
        console.log('this.$parent => ', this.$parent)
    },
      methods: {
        // updates post functions
        hanldeGetUpdateData() {
            axios({
                method: 'POST',
                url: '/ai/idea/update_post/get/all/' + this.$route.params.id
            }).then( (res) => {
                console.log('TCL: hanldeGetUpdateData -> res.data', res.data);
                this.updates_post_data = res.data;
                this.$ud_store.commit('SET_IDEA_UPDATES', res.data)
            }); 
        },
        handleUpdatePostDarts(value) {
            axios({
                method: 'POST',
                url: '/ai/idea/update_post/darts/add/' + value,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                }
            }).then(res => {
                console.log('res => ', res.data);
                this.hanldeGetUpdateData()
            });
        },
        handleUpdatePostSubmit(e) {
            e.preventDefault();
            axios({
                method: 'POST',
                url: '/ai/idea/update_post/create/' + this.$route.params.id,
                data: {
                    title: this.update_post.title,
                    message: this.update_post.message
                }
            }).then( (res) => {
                this.update_post_create = res.data;
                this.hanldeGetUpdateData()
            });
        },
        handleUpdatePostDelete(value) {
            axios({
                method: 'POST',
                url: '/ai/idea/update_post/delete/' + value,
            }).then( (res) => {
                this.update_post_create = res.data;
            });
        },
        handleUpdatePostUpdate(e){
            e.preventDefault();
            let update_post_id = this.update_post_update.id;
            axios({
                method: 'POST',
                url: '/ai/idea/update_post/update/' + update_post_id,
                data: {
                    title: this.update_post_update.title,
                    message: this.update_post_update.message,
                },
            }).then( (res) => {
                if (res.data === "") {
                    alert('error creating timeline entry');
                }
            });
        },
      }
    }
</script>
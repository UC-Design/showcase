<template>
    <section class="timeline-container fixed_width">
        <div class="timeline-wrapper">

            <div class="timeline_item_container">
                <!-- add new item form -->
                <div v-if="$parent.isUsersIdea" class="timeline_item timeline_add_new">
                    <div class="side_line">
                        <div class="icon">
                            <!-- <span v-html="this.$ud_store.state.icons.x" /> -->
                        </div>
                    </div>
                    <div class="timeline_box">
                        <h5 class="timeline_date">Day / Month / Year</h5>
                        <!-- <h2 class="timeline_title">Milestone Title</h2> -->
                        <label for="timeline.title">Title</label>
                        <input class="timeline_title" placeholder="Milestone Title" v-model="timeline.title" type="text" required/>
                        <!-- <p class="timeline_message">Description (240 characters)</p> -->
                        <label for="timeline.message">Description</label>
                        <textarea placeholder="Description (240 characters)" class="timeline_message" v-model="timeline.message" type="text" required/>
                        <!-- <a class="timeline_link" target="_blank">add URL link</a> -->
                        <div class="timeline_item_footer">
                            <div class="timeline_link">
                                <span v-html="this.$ud_store.state.icons.share"></span>
                                <label for="timeline.link">Link</label>
                                <input placeholder="add URL link" v-model="timeline.link" type="text"/>
                                <span v-html="this.$ud_store.state.icons.x" @click="deleteLink()"></span>
                            </div>
                            <div class="total-likes" @click="handleTimelineSubmit">
                                <p>Post</p>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="this.currentTimelineData.length > 0">
                    <div class="timeline_item" v-for="(value, key) in this.currentTimelineData" :key="key">
                        <div class="side_line">
                            <div class="icon">
                                <!-- <span v-html="this.$ud_store.state.icons.x" /> -->
                                </div>
                        </div>
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
                                <div v-else class="total-likes" @click="handleTimelineDartsAdd(value.id)">
                                    <p>{{ value.darts }}</p><span v-html="icons.dart" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="no-timeline-found">
                        <span v-html="this.$ud_store.state.icons.tumbleweed" />
                        <h2>There hasn't been any major events yet.</h2>
                    </div>
                </template>
            </div>
        
        </div>
    </section>
</template>

<style lang="scss">
  @import '~@/_variables.scss';
  .no-timeline-found {
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
    width: 80%;
    margin: 60px auto;
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
        grid-template-columns: 20% 1fr;
        .timeline_box {
            padding: 16px 0;
            width: 75%;
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
        .side_line {
            position: relative;
            height: 100%;
            width: 1px;
            background-color: $black;
            margin-left: 134px;
            .icon {
                border-radius: 100%;
                position: absolute;
                width: 12px;
                height: 12px;
                background-color: $black;
                top: 45px;
                left: -6px;
            }
        }
        &:first-child {
            .side_line {
                align-self: flex-end;
                height: calc(100% - 38px);
                .icon {
                    background-color: $ideation;
                    color: $white;
                    width: 24px;
                    height: 24px;
                    top: -2px;
                    left: -12px;
                }
            }
        }
        &:last-child {
            .side_line {
                align-self: flex-start;
                height: 24%;
                .icon {
                    background-color: $black;
                    top: 38px;
                }
            }
        }
    }
}


</style>

<script>
export default {
      // name: 'Timeline',
    data() {
        return {
            timeline_data: '',
            timeline: {
                title: '',
                message: '',
                link: ''
            },
            timeline_update: {
                title: '',
                message: '',
                link: ''
            },
            icons: {
                dart: this.$ud_store.state.icons.dart,
                trash: this.$ud_store.state.icons.trash
            }
        }
    },
    computed: {
        currentTimelineData() {
            return this.$ud_store.getters.getCurrentIdeaTimeline
        }
    },
    mounted() {
        console.log("%c Timeline.vue", this.$ud_store.state.consoleLog.component)
        this.hanldeGetTimelineData();
        console.log('this.$ud_store.state.icons.x => ', this.$ud_store.state.icons.x)
    },
    methods: {
          deleteLink() {
              this.timeline.link = '';
          },
            hanldeGetTimelineData() {
                axios({
                    method: 'POST',
                    url: '/ai/idea/timeline/get/' + this.$route.params.id,
                }).then( (res) => {
                    console.log('TCL: hanldeGetTimelineData -> res', res);
                    // push to store getter
                    this.$ud_store.commit('SET_IDEA_TIMELINE', res.data );
                    this.timeline_data = res.data;
                    // clears post input
                    this.timeline.title = '';
                    this.timeline.message = '';
                    this.timeline.link = '';
                });
            },
            handleTimelineSubmit(e){
                e.preventDefault();
                axios({
                    method: 'POST',
                    url: '/ai/idea/timeline/create/' + this.$route.params.id,
                    data: {
                        title: this.timeline.title,
                        message: this.timeline.message,
                        link: this.timeline.link
                    },
                }).then( (res) => {
                    console.log('TCL: hanldeGetTimelineData -> res', res.data);
                    this.hanldeGetTimelineData()
                });
            },
            handleTimelineUpdate(e){
                let value = this.timeline_update.id;
                axios({
                    method: 'POST',
                    url: '/ai/idea/timeline/update/' + value,
                    data: {
                        title: this.timeline_update.title,
                        message: this.timeline_update.message,
                        lnik: this.timeline_update.link
                    },
                }).then( (res) => {
                    console.log('TCL: hanldeGetTimelineData -> res', res);
                    this.hanldeGetTimelineData()
                });
            },
            handleTimelineDelete(value) {
                axios({
                    method: 'POST',
                    url: '/ai/idea/timeline/delete/' + value,
                }).then( (res) => {
                    console.log('delete => ', res)
                    this.hanldeGetTimelineData()
                });
            },
            handleTimelineDartsAdd(value) {
                axios({
                    method: 'POST',
                    url: '/ai/idea/timeline/darts/add/' + value,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                }).then(res => {
                    console.log('dartsAdd => ', res)
                    this.hanldeGetTimelineData()
                });
            },
        }
    }
</script>
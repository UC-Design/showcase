<template>
    <div class="container">
        <div class="row">

            <header class="header-container">
                <div class="header-wrapper fixed_width">
                    <div id="title">
                        <h2>{{currentIdeaData.data.title}}</h2>
                        <h4>Posted by <router-link :to='"/user/" + currentIdeaData.user_data.id' >{{currentIdeaData.user_data.name}}</router-link></h4>
                    </div>

                    <div id="elevator">
                        <p>{{currentIdeaData.data.pitch}}</p>
                    </div>

                    <section class="meta_data">
                        <ul>
                            <li class="category"><router-link :to="`/category/${currentIdeaData.data.category}`">{{currentIdeaData.data.category}}</router-link></li>
                            <li :class="'status bg_' + currentIdeaData.data.status">{{currentIdeaData.data.status}}</li>
                            <li class="tags" v-for="(value, key) in idea_current_tags" :key="key">
                                {{value}}
                            </li>
                        </ul>
                    </section>
                </div>
            </header>

            <div class="page-wrapper">
                <TabNav v-bind:props="tab_nav"/>

                <router-view>
                    <!-- Description / Timeline / Discussion / Updates here -->
                </router-view>
            </div>
            
        </div>
    </div>
</template>

<style lang="scss">
@import '~@/App.scss';

.meta_data {
    display: flex;
    > ul {
        list-style-type: none;
        display: inline-flex;
        padding: 0;
        margin: 0;
        .category {
            background-color: $black;
            margin-left: 0;
        }
        .status, .category {
            font-weight: $w-bold;
            text-transform: uppercase;
        }
        .tags {
            border: 1px solid $black;
            color: $black;
        }
        > li {
            padding: 8px 16px;
            margin: 0 4px;
            border-radius: 25px;
            color: $white;
            @include fontSize(12px);
            a {
                text-decoration: none;
                color: $white;
            }
        }
    } 
}

.header-container {
    width: 100%;
    background-color: $white;
    padding: 25px 0 100px;
    .header-wrapper {
        /* width: 100%; */
        margin: 0 auto;
        #title {
            h2 {
                text-align: left;
                margin: 8px 0;
                font-size: 64px;
                font-weight: $w-bold;
                color: $black;
            }
            h4, a {
                text-align: left;
                margin: 8px 0;
                font-size: 16px;
                font-weight: $w-regular;
                color: $grey-dark;
                text-decoration: none;
                a {
                    color: $grey-dark;
                    transition: .5s;
                    &:hover {
                        color: $black;
                        transition: .5s;
                    }
                }
            }
        }
        #elevator {
            display: flex;
            align-content: flex-start;
            justify-content: flex-start;
            margin: 16px 0 24px;
            p {
                text-align: left;
                margin: 0;
                color: $black-light;
                max-width: 648px;
                font-family: $font-family-sans-serif;
            }
        }
    }
}

.idea_navigation {
    width: 100%;
    > ul {
        display: inline-flex;
        margin: 0 auto;
        width: 100%;
        
        list-style-type: none;
        .active {
            border-bottom: 2px solid $grey-dark;
        }
        > li {
            padding: 4px;
            
            font-size: $size-p;
            color: $p-color;
            border-bottom: 2px solid $white;
            a {
                text-decoration: none;
                margin: 0 4px;
            }
        }
    }
}
</style>

<script>
    import TabNav from '../components/TabNav'

    import Description from '../components/idea/Description'
    import Timeline from '../components/idea/Timeline'
    import Updates from '../components/idea/Updates'
    import Discussion from '../components/idea/Discussion'
    
    export default {
        props: ['props'],
        components: {
            Description, Timeline, Updates, Discussion, TabNav
        },
        data() {
            return {
                idea_data: '',
                isUsersIdea: false,
                subNavActive: 'Description',
                description_to_update: '',
                idea_current_tags: [],
                idea_current_description: '',
                update_post: {
                    title: '',
                    message: ''
                },
                update_post_update: {
                    id: '',
                    title: '',
                    message: ''
                },
                discussion_data: '',
                updates_post_data: '',
                discussion_replies_data: '',
                ideas: [],
                tab_nav: [
                    {
                        id: 'description',
                        label: 'Description',
                        route: '/add-new-idea',
                        active: this.$route.name === 'description' ? true : false
                    },
                    {
                        id: 'timeline',
                        label: 'Timeline',
                        route: '',
                        active: this.$route.name === 'timeline' ? true : false,
                    }
                    // {
                    //     id: 'discussion',
                    //     label: 'Discussion',
                    //     route: '',
                    //     active: this.$route.name === 'discussion' ? true : false,
                    // },
                    // {
                    //     id: 'updates',
                    //     label: 'Updates',
                    //     route: '',
                    //     active: this.$route.name === 'updates' ? true : false,
                    // }
                ],
            }
        },
        computed: {
            currentUser() {
                if (this.$ud_store.getters.getUserData === null) {
                    return {
                        id: null
                    }
                } else {
                    return this.$ud_store.getters.getUserData.id
                }
            },
            currentIdeaData() {
                return this.$ud_store.getters.getCurrentIdea
            },
            currentIdeaDescription() {
                return this.$ud_store.getters.getCurrentIdeaDescription
            },
            getCurrentIdeaUserId() {
                return this.$ud_store.getters.getCurrentIdeaUserId
            },
        },
        beforeMount() {
            console.log("%c IndividualIdea.vue beforeMount(start)", this.$ud_store.state.consoleLog.component)
            console.warn('this.$ud_store.getters.getCurrentIdea => ', this.$ud_store.getters.getCurrentIdea)
            console.warn('this.$ud_store.getters.getCurrentIdea => ', this.$ud_store.getters.getUserData)
            console.warn('this.currentUser => ', this.currentUser)
            this.handleGetInitialData();
            this.setAsActive();
            this.allowEdit;
            console.log('TCL: beforeMount -> this.allowEdit', this.allowEdit);
            console.log("%c IndividualIdea.vue beforeMount(end)", this.$ud_store.state.consoleLog.component)
        },
        mounted() {
             console.log("%c IndividualIdea.vue mounted(start)")
             console.log("%c IndividualIdea.vue mounted(end)")
        },
        watch: {
            $route: function(to, from) {
                if (to.params.id !== from.params.id) {
                    this.handleGetInitialData();
                    // handle get more data here;
                }

                // this.copy_successful = false
                this.setAsActive();
            }
        },
        methods: {
            // re-sets the current active tab_nav item
            setAsActive() {
                this.tab_nav = [
                    {
                        id: 'description',
                        label: 'Description',
                        route: '/add-new-idea',
                        active: this.$route.name === 'description' ? true : false
                    },
                    {
                        id: 'timeline',
                        label: 'Timeline',
                        route: '',
                        active: this.$route.name === 'timeline' ? true : false,
                    }
                    // {
                    //     id: 'discussion',
                    //     label: 'Discussion',
                    //     route: '',
                    //     active: this.$route.name === 'discussion' ? true : false,
                    // },
                    // {
                    //     id: 'updates',
                    //     label: 'Updates',
                    //     route: '',
                    //     active: this.$route.name === 'updates' ? true : false,
                    // }
                ];
            },
            handleGetInitialData() {
                console.log("%c IndividualIdea.vue handleGetInitialData(start)", this.$ud_store.state.consoleLog.component)
                // console.log('TCL: handleGetInitialData -> idea_id', this.$route.params.id);
                axios({
                    method: 'POST',
                    url: '/ai/idea/get/' + this.$route.params.id,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                }).then(res => {
                    this.idea_data = res.data;
                    this.idea_current_tags = JSON.parse(res.data.tags)
                    this.idea_current_description = res.data.description;
                    // this.$ud_store.commit('SET_IDEA_DATA', res.data );
                    this.$ud_store.commit('SET_IDEA_DATA', res.data );
                    this.$ud_store.commit('SET_IDEA_USER_ID', res.data.user_id );
                    this.$ud_store.commit('SET_IDEA_DESCRIPTION', res.data.description );


                    let res_user = res.data.user_id;
                    console.log('TCL: handleGetInitialData -> res_user', res_user);
                    let current_user = null;
                    
                    if (this.currentUser === null) {
                        current_user = this.currentUser;
                    }

                    if (res_user === current_user) {
                        this.isUsersIdea = true;
                        console.log('TCL: handleGetInitialData -> this.isUsersIdea', this.isUsersIdea);
                    }
                    axios({
                        method: 'POST',
                        url: '/ai/user/get/' + res.data.user_id,
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                        }
                    }).then(res => {
                        console.log('user of current idea');
                        
                        this.$ud_store.commit('SET_IDEA_USER_INFO', res.data.user );
                        
                        console.warn(this.getCurrentIdeaUserId)
                        console.warn(this.currentUser)
                        if (this.getCurrentIdeaUserId === this.currentUser) {
                            this.isUsersIdea = true;
                        }
                        console.log('TCL: handleGetInitialData -> this.isUsersIdea', this.isUsersIdea);
                    })
                });
                console.log("%c IndividualIdea.vue handleGetInitialData(end)", this.$ud_store.state.consoleLog.component)

            },
            handleDeleteIdea(e) {
                e.preventDefault();
                axios.post('/ai/idea/delete/' + this.$route.params.id)
                    .then(response => {
                        console.log('TCL: handleDeleteIdea -> response', response);
                });
            },
            handleUpdateIdea(desc = null) {
                console.log('handleUpdateIdea')
                let updatedDescriptionVal = desc ? desc : this.description_to_update;

                console.log('updatedDescriptionVal => ', updatedDescriptionVal)
                axios({
                    method: 'POST',
                    url: '/ai/idea/update/' + this.$route.params.id,
                    data: {
                        description: updatedDescriptionVal,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                }).then(res => {
                    console.log('handleUpdateIdea res => ', res)
                    console.log('handleUpdateIdea res.data => ', res.data)

                    this.$ud_store.commit('SET_IDEA_DATA', res.data.updated_idea );
                })
                .catch(e => console.error(e));
            },

            // discussion replies functions
            handleDiscussionReplyVote(reply_id) {
                axios({
                    method: 'POST',
                    url: '/ai/idea/discussion/reply/darts/' + reply_id
                }).then( (response) => {
                    this.discussion_replies_data = response.data;
                });
            },
            handleDiscussionReplyDelete(value) {
                axios({
                    method: 'POST',
                    url: '/ai/idea/discussion/reply/delete/' + value,
                }).then( (response) => {
                    this.discussion_replies_data = response.data;
                });
            },
            handleDiscussionRepliesGet(value) {
                axios({
                    method: 'POST',
                    url: '/ai/idea/discussion/reply/get/all/' + value
                }).then( (response) => {
                    this.discussion_replies_data = response.data;
                }); 
            },

            // timeline functions
            // handleTimelineUpdate(e){
            //     let value = this.timeline_update.id;
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/update/' + value,
            //         data: {
            //             title: this.timeline_update.title,
            //             message: this.timeline_update.message,
            //         },
            //     }).then( (response) => {
            //         if (response.data === "") {
            //             alert('error creating timeline entry');
            //         }
            //     });
            // },
            // handleDartsAdd(value) {
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/darts/add/' + value,
            //         headers: {
            //             'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
            //         }
            //     });
            // },
            // handleTimelineDelete(value) {
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/delete/' + value,
            //     }).then( (response) => {
            //         this.timeline_data = response.data;
            //     });
            // },
            // getTimelineData(e) {
            //     e.preventDefault();
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/get/' + this.$route.params.id,
            //     }).then( (response) => {
            //         this.timeline_data = response.data;
            //     });
            // },
            // timeline functions
            // hanldeGetTimelineData(e) {
            //     e.preventDefault();
            //     let idea_id = this.$route.params.id;
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/get/' + idea_id,
            //     }).then( (response) => {
            //         this.timeline_data = response.data;
            //     });
            // },
            // handleTimelineSubmit(e){
            //     e.preventDefault();
            //     let idea_id = this.$route.params.id;
            //     axios({
            //         method: 'POST',
            //         url: '/ai/idea/timeline/create/' + idea_id,
            //         data: {
            //             title: this.timeline.title,
            //             message: this.timeline.message,
            //         },
            //     }).then( (response) => {
            //         if (response.data === "") {
            //             alert('error creating timeline entry');
            //         }
            //     });
            // },
        }
    }
</script>
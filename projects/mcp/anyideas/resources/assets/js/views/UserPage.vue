<template>
    <div class="container">
        <div class="row">
            <template>
                <header>
                    <div class="fixed_width">
                        <div class="profile-image-wrapper">
                            <div class="profile-image" :style="{ 'background-image': `url(${getProfileImage})` }"></div>

                            <div class="total-likes">
                                <p>{{ totalLikes }}</p><span v-html="this.$ud_store.state.icons.dart" />
                            </div>
                        </div>

                        <div class="profile-information" v-if="user_data && user_data.user">
                            <span class="username">@{{user_data.user.username}}</span>
                            <div class="name">
                                <template v-if="!editing_name">
                                    <h1>{{user_data.user.name}}</h1>
                                </template>
                                <template v-else>
                                    <input type="text" name="name" id="name" v-model="user_meta_update.name">
                                </template>

                                <div class="actions" v-if="showEditingControls">
                                    <template v-if="!editing_name">
                                        <a href="#edit-name" v-html="this.$ud_store.state.icons.edit" @click="toggleEditing" />
                                    </template>
                                    <template v-else>
                                        <a href="#cancel-name" v-html="this.$ud_store.state.icons.x" @click="toggleEditing" />
                                        <a href="#save-name" v-html="this.$ud_store.state.icons.check" @click="updateUserData" />
                                    </template>
                                </div>
                            </div>
                            <ul v-if="user_data.social_media" class="social-media">
                                <li v-if="user_data.social_media.facebook">
                                    <a :href="user_data.social_media.facebook" target="_blank" rel="noopener noreferrer" v-html="this.$ud_store.state.icons.social.facebook" />
                                </li>
                                <li v-if="user_data.social_media.instagram">
                                    <a :href="user_data.social_media.instagram" target="_blank" rel="noopener noreferrer" v-html="this.$ud_store.state.icons.social.instagram" />
                                </li>
                                <li v-if="user_data.social_media.youtube">
                                    <a :href="user_data.social_media.youtube" target="_blank" rel="noopener noreferrer" v-html="this.$ud_store.state.icons.social.youtube" />
                                </li>
                            </ul>
                        </div>

                        <a
                            href="#share-profile"
                            class="share-profile"
                            @click="doCopy"
                        >
                            <span v-if="copy_successful" v-html="this.$ud_store.state.icons.check" />
                            <span v-else v-html="this.$ud_store.state.icons.share" />
                        </a>
                    </div>
                </header>

                <!-- <div v-if="this.$ud_store.state.data.user_data.id === this.user_data.user.id"> -->
                <div style="display: none;">
                    <h1>Edit user meta</h1>
                    <form method="POST">
                        <div class="form-group row">
                            <label for="update_post.name" class="col-md-4 col-form-label text-md-right">Name</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.name" type="text" class="form-control" v-model="user_meta_update.name" autofocus>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.username" class="col-md-4 col-form-label text-md-right">Username</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.username" type="text" class="form-control" v-model="user_meta_update.username">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.email" class="col-md-4 col-form-label text-md-right">Email</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.email" type="text" class="form-control" v-model="user_meta_update.email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.interests" class="col-md-4 col-form-label text-md-right">Interests</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.interests" type="text" class="form-control" v-model="user_meta_update.interests">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.social_media" class="col-md-4 col-form-label text-md-right">Social Medias</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.social_media" type="text" class="form-control" v-model="user_meta_update.social_media">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.website" class="col-md-4 col-form-label text-md-right">Website</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.website" type="text" class="form-control" v-model="user_meta_update.website">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user_meta_update.occupation" class="col-md-4 col-form-label text-md-right">Occupation</label>

                            <div class="col-md-6">
                            <input id="user_meta_update.occupation" type="text" class="form-control" v-model="user_meta_update.occupation">
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary" @click="handleUpdateUserMeta">
                                Post user_meta_update update
                            </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="page-wrapper">
                    <TabNav v-bind:props="tab_nav"/>
                    <router-view>
                        <!-- ideas / about -->
                    </router-view>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~@/_variables.scss';
    header {
        background-color: $white;
        padding-top: 65px;
        > div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            .share-profile {
                background: white;
                box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                border-radius: 50%;
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: calc(100% - 21px);
                right: 0;
                color: $black;
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 24px;
                    width: 24px;
                    svg {
                        display: block;
                    }
                }
            }
        }
        .profile-image-wrapper {
            position: relative;
            .profile-image {
                width: 165px;
                height: 165px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                border-radius: 50%;
            }
            .total-likes {
                padding: 5px 15px;
                background: white;
                border-radius: 200px;
                line-height: 1;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                position: absolute;
                left: 50%;
                top: calc(100% - 20px);
                transform: translateX(-50%);
                p {
                    margin: 0 15px 0 0;
                    flex-grow: 2;
                    font-size: 1.3em;
                    font-weight: $w-bold;
                }
                span {
                    width: 34px;
                    span svg {
                        display: block;
                    }
                }
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
                input[name="name"] {
                    color: $black;
                    border: none;
                    border-bottom: 2px solid $black;
                    background: transparent;
                    padding: 0;
                    font-weight: $w-bold;
                    font-family: $font-family-sans-serif;
                    &:focus {
                        outline: none;
                    }
                }
                .actions {
                    flex-grow: 2;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-left: 16px;
                    a {
                        display: block;
                        color: $black;
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                    }
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
    }
</style>

<script>
    import IdeaCard from '../components/IdeaCard'
    import TabNav from '../components/TabNav'

    export default {
        components: {
            IdeaCard, TabNav
        },
        data() {
            return {
                idea: {
                    title: '',
                    description: ''
                },
                user_meta_update: {
                    name: '',
                    avatar: '',
                    interests: '',
                    social_media: '',
                    occupation: '',
                },
                user_ideas: null,
                // user_data: '',
                tab_nav: [
                    {
                        id: 'ideas',
                        label: 'Ideas',
                        route: '/ideas',
                        active: this.$route.name === 'ideas' ? true : false,
                    },
                    {
                        id: 'about',
                        label: 'About',
                        route: '',
                        active: this.$route.name === 'about' ? true : false,
                    }
                ],
                copy_successful: false,
                editing_name: false
            }
        },
        beforeMount() {
            this.getUserData();
        },
        mounted() {
            this.getUserIdeas();
        },
        methods: {
            getUserData() {
                axios({
                    method: 'POST',
                    url: '/ai/user/get/' + this.$route.params.id,
                })
                .then( (res) => {
                    // this.user_data = res.data
                    // push to viewing_user_state store
                    this.$ud_store.commit('SET_CURRENT_USER_DATA', res.data);
                    this.user_meta_update.name = this.user_data.user.name
                })
                .catch(e => console.error(e))
            },
            getUserIdeas() {
                axios({
                    method: 'POST',
                    url: '/ai/idea/get-by-user/' + this.$route.params.id,
                })
                .then((res) => {
                    if (Object.keys(res.data.ideas).length > 0) {
                        this.user_ideas = res.data.ideas
                    }
                    else {
                        this.user_ideas = null
                    }

                    this.$ud_store.commit('SET_CURRENT_USER_IDEAS', this.user_ideas);
                })
                .catch(e => console.error(e))
            },
            setAsActive() {
                let navs = this.tab_nav

                this.tab_nav.forEach((nav, i) => {
                    navs[i].active = this.$route.name === nav.id ? true : false
                });

                this.tab_nav = navs
            },
            handleUpdateUserMeta() {
                axios({
                    method: 'POST',
                    url: '/ai/user/update/' + this.$route.params.id,
                    data: {
                        name: this.user_meta_update.name,
                        avatar: this.user_meta_update.avatar,
                        username: this.user_meta_update.username,
                        email: this.user_meta_update.email,
                        interests: this.user_meta_update.interests,
                        social_media: this.user_meta_update.social_media,
                        website: this.user_meta_update.website,
                        occupation: this.user_meta_update.occupation,
                    }
                }).then( (response) => {
                    this.user_ideas = response.data
                    // console.warn('TCL: handleUpdateUserMeta -> this.user_ideas', this.user_ideas);
                });
            },
            doCopy(e) {
                e.preventDefault();
                this.$copyText(window.location.href)
                    .then(res => {
                        this.copy_successful = true
                    })
                    .catch(res => {
                        alert('Could not copy, please try again.')
                    })
            },
            toggleEditing(e) {
                e.preventDefault();
                if (this.showEditingControls) {
                    let state = this.editing_name
                    this.editing_name = !state

                    if (this.editing_name === false) {
                        this.user_meta_update.name = this.user_data.user.name
                    }
                }
            },
            updateUserData(e) {
                e.preventDefault();

                if (!this.showEditingControls) return false

                axios({
                    method: 'POST',
                    url: `/ai/user/update/${this.user_data.user.id}`,
                    data: {
                        user_meta_update: this.user_meta_update
                    }
                })
                .then(({data}) => {
                    console.log('Data -> ', data)
                    if (!data.success) {
                        alert(data.msg);
                    }
                    else {
                        this.$ud_store.commit('SET_USER_DATA', data.user)
                        this.$ud_store.commit('SET_CURRENT_USER_META', { key: 'name', value: data.user.name })
                        this.toggleEditing(e)
                    }
                })
                .catch(e => console.error(e))
            }
        },
        computed: {
            totalLikes() {
                if (this.user_ideas === null || this.user_ideas.length === 0) {
                    return 0
                }
                else {
                    let total = Object.keys(this.user_ideas).reduce((total, key) => {
                        return total + this.user_ideas[key].darts
                    }, 0);

                    return total;
                }
            },
            currentUser() {
                return this.$ud_store.getters.getUserData
            },
            showEditingControls() {
                if (this.currentUser) {
                    return parseInt(this.currentUser.id) === parseInt(this.$route.params.id)
                }
                else {
                    return false
                }
            },
            isLoggedIn() {
                return this.$ud_store.getters.getLoggedInState
            },
            user_data() {
                return this.$ud_store.getters.getUserMeta
            },
            getProfileImage() {
                if (this.user_data && this.user_data.user_meta) {
                    if (this.user_data.user_meta.hasOwnProperty('avatar')) {
                        if (this.user_data.user_meta.avatar !== null) {
                            return this.user_data.user_meta.avatar
                        }
                    }
                }

                return require('../../images/profile.jpg');
            }
        },
        watch: {
            $route: function(to, from) {
                if (to.params.id !== from.params.id) {
                    this.getUserData();
                    this.getUserIdeas();
                }

                this.copy_successful = false
                this.setAsActive();
            }
        }
    }
</script>

<template>
    <div class="container fixed_width">
        <div class="header-container" :style="{'background-image': `url(${require('../../images/anyideas-icon-pattern.svg')})`}">
            <div class="card card-default">
                <div class="home-header">
                    <!-- https://codepen.io/jerrylow/pen/KaPvNa -->
                    Turn Your Shower Thoughts Into <br>Power Thoughts
                    
                </div>
            </div>
        </div>

        <div class="row justify-content-center page-wrapper">
            <!-- <button @click="searchDatabase">Run search query</button> -->
            <div class="idea_wrapper">
                <div class="fixed_width" v-for="(value, key) in this.user_ideas" :key="key">
                    <IdeaCard key={{key}} :props='value'/>
                </div>

                <div class="actions" v-if="user_ideas.length < totalIdeas">
                    <a href="#load-more" class="btn btn-load-more" :class="{ disabled: loading }" @click="loadMore">
                        <template v-if="!loading">
                            Load more
                        </template>
                        <template v-else>
                            <loading />
                        </template>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~@/_variables.scss';
    .actions {
        margin-top: 60px;
        text-align: center;
        .btn {
            color: $black;
            background: $white;
            padding: 18px 24px 16px;
            text-transform: uppercase;
            font-weight: $w-bold;
            display: inline-block;
            text-decoration: none;
            text-align: center;
            min-width: 200px;
            font-size: 1.3em;
            overflow: hidden;
            &.disabled {
                opacity: 0.5;
                pointer-events: none !important;
            }
            .loading {
                width: 27px;
                height: 27px;
                > div {
                    width: 27px !important;
                    height: 27px !important;
                    svg {
                        fill: $primary !important;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    @import '~@/_variables.scss';
    .header-container {
        background-color: #F5F5F5;
        background-repeat: repeat;
        width: 100%;
        min-height: 400px;
        margin: 0;
        padding: 0;
        transition: .5s;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .home-header {
            font-size: $size-h1;
            font-weight: $w-bold;
            padding: 25px 45px;
            background: $pure;
        }
    }
    .idea_wrapper {
        // margin-top: 48px;
        > div {
            max-width: 750px;
            margin: 0 auto;
            &:last-child {
                .card,
                .idea-card-container {
                    margin-bottom: 0;
                }
            }
            &:first-child {
                .card,
                .idea-card-container {
                    margin-top: 0;
                }
            }
        }
    }
</style>

<script>
    import Lottie from 'vue-lottie';
    import IdeaCard from '../components/IdeaCard'
    
    export default {
        components: {
            IdeaCard
        },
        data() {
            return {
                idea: {
                    title: '',
                    description: ''
                },
                user_ideas: [],
                search_results: '',
                errors: [],
                ideas: [],
                query: {
                    limit: 5,
                    offset: 0,
                    not_in: []
                },
                totalIdeas: 99999999999,
                getInterestedInPostsState: true,
                loading: false
            }
        },
        mounted() {
            this.getInterestedInPosts();
        },
        methods: {
            searchDatabase() {
                axios({
                    method: 'POST',
                    url: '/ai/search',
                    data: {
                        search: "steve"
                    },
                }).then( (response) => {
                    console.log('TCL: search -> response', response);
                });
            },
            loadMore(e) {
                e.preventDefault();
                this.loading = true;

                if (this.getInterestedInPostsState === true) {
                    this.getInterestedInPosts();
                }
                else {
                    axios({
                        method: 'POST',
                        url: '/ai/idea/populateFeed',
                        data: { ...this.query }
                    })
                    .then(res => {
                        this.changeData(res)
                    })
                    .catch(e => console.log(e))
                }
            },
            getInterestedInPosts() {
                axios({
                    method: 'POST',
                    url: '/ai/idea/populateAuthFeed',
                    data: {
                        ...this.query,
                        offset: 0
                    }
                })
                .then(({data}) => {
                    this.user_ideas.push(...data.ideas)
                    this.query.not_in = data.not_in
                    this.totalIdeas = data.total_count

                    if (data.ideas.length < this.query.limit) {
                        let dif = this.query.limit - data.ideas.length
                        
                        this.fillOutReturnResponse(dif)
                            .then(res => {
                                this.changeData(res)
                            })
                            .catch(e => console.error(e))
                    }
                    else {
                        this.loading = false
                    }
                })
                .catch(e => console.error(e))
            },
            fillOutReturnResponse(dif) {
                return axios({
                    method: 'POST',
                    url: '/ai/idea/populateFeed',
                    data: {
                        not_in: this.query.not_in,
                        limit: dif,
                        offset: 0
                    }
                })
            },
            changeData(response) {
                this.user_ideas.push(...response.data.ideas)
                this.query.offset = response.data.offset
                this.totalIdeas = response.data.total_count
                this.not_in = response.data.not_in
                this.getInterestedInPostsState = false
                this.loading = false
            }
        }

    }
</script>
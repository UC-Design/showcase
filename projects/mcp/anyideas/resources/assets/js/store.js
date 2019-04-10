import Vuex from 'vuex'
import Vue from 'vue';
import icons from './data/icons'
import categories from './data/categories'
import status from './data/status'
import svgBackground from './data/svgBackground'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: {
            user_data: null,
            loggedIn: false
        },
        // idea: {
        //     id: '',
        //     title: '',
        //     status: '',
        //     category: '',
        //     tags: '',
        //     description: '',
        // },
        current_page_idea: {
            user_id: '0',
            user_data: {},
            data: {},
            description: '',
            timeline: [],
            discussion: {
                replies: []
            },
            updates: {}
        },
        current_search: {
            ideas: [],
            users: [],
        },
        current_category_id: '',
        consoleLog: {
            component: ["background: rgb(11, 11, 13)", "color: rgb(66,185,131)", "border: 1px solid rgb(66,185,131)", "padding: 4px 24px 4px 16px", "line-height: 24px"].join(";"),
        },
        current_user_view: null,
        current_user_ideas: null,
        icons: icons,
        categories: categories,
        status: status,
        svgBackground: svgBackground,
    },
    mutations: {
        SET_USER_DATA(state, newValue) {
            state.data.user_data = newValue;
        },
        SET_USER_LOGGED_IN(state, newValue) {
            state.data.loggedIn = newValue;
        },
        CLEAR_USER_DATA(state) {
            state.data.user_data = '';
            state.data.loggedIn = false;
        },

        // idea 
        SET_IDEA_DATA(state, newValue) {
            state.current_page_idea.data = newValue;
        },
        SET_IDEA_DESCRIPTION(state, newValue) {
            state.current_page_idea.description = newValue;
        },
        SET_IDEA_USER_ID(state, newValue) {
            state.current_page_idea.user_id = newValue;
        },
        SET_IDEA_USER_INFO(state, newValue) {
            state.current_page_idea.user_data = newValue;
        },
        SET_IDEA_TIMELINE(state, newValue) {
            state.current_page_idea.timeline = newValue;
        },
        SET_IDEA_DISCUSSION(state, pushToStore) {
            state.current_page_idea.discussion = pushToStore;
        },
        SET_IDEA_UPDATES(state, val) {
            state.current_page_idea.updates = val;
        },

        // search
        SET_CURRENT_SEARCH_QUERY(state, val) {
            state.current_search = val
        },
        SET_CURRENT_SEARCH(state, newValue) {
            state.current_search = {ideas: newValue.ideas, users: newValue.users,};;
        },
        CLEAR_CURRENT_SEARCH(state) {
            state.current_search = {ideas: [], users: [],};
        },

        //category
        SET_CATEGORY_ID(state, newValue) {
            state.current_category_id = newValue;
        },

        // current user **not currently logged in user**
        SET_CURRENT_USER_DATA(state, newValue) {
            state.current_user_view = newValue;
        },
        SET_CURRENT_USER_IDEAS(state, newValue) {
            state.current_user_ideas = newValue;
        },
        SET_CURRENT_USER_META(state, payload) {
            state.current_user_view.user[payload.key] = payload.value
        },
        SET_CURRENT_USER_INTERESTS(state, interests) {
            state.current_user_view.interests = interests
        },
        SET_CURRENT_USER_BIO(state, bio) {
            state.current_user_view.user_meta.bio = bio
        }
    },
    getters: {
        getUserIdeas: (state) => state.current_user_ideas,
        getUserMeta: (state) => state.current_user_view,
        getUserIdeasCount: (state) => {
            if (state.current_user_ideas === null) {
                return 0
            }
            else {
                return Object.keys(state.current_user_ideas).length
            }
        },
        getUserData: (state) => state.data.user_data,
        getLoggedInState: (state) => state.data.loggedIn,
        getCurrentIdea: (state) => state.current_page_idea,
        getCurrentIdeaUserId: (state) => state.current_page_idea.user_id,
        getCurrentIdeaDescription: (state) => state.current_page_idea.description,
        getCurrentIdeaTimeline: (state) => state.current_page_idea.timeline,
        getCurrentIdeaDiscussion: (state) => state.current_page_idea.discussion,
        getCurrentIdeaUpdates: (state) => state.current_page_idea.updates,
        // getCurrentSearch: (state) => state.current_search,
        getCurrentSearch: (state) => state.current_search,
        getCurrentSearchUsers: (state) => state.current_search.users,
        getCurrentSearchIdeas: (state) => state.current_search.ideas
    }
  })
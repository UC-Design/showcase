<template>
    <div class="user-login-register-view">
        <div class="underlay" :style="{'background-image': `url(${require('../../images/anyideas-icon-pattern.svg')})`}"></div>
        <div class="container">
            <header>
                <router-link :to="{name: 'index'}" v-html="this.$ud_store.state.icons.logo_big"></router-link>
            </header>
            <div class="steps-container">
                <div class="step">
                    <blockquote>
                        <p>“Great minds discuss ideas; average minds discuss events; small minds discuss people.”</p>
                        <cite>ELEANOR ROOSEVELT</cite>
                    </blockquote>
                    <div class="form-block">
                        <div class="input-field">
                            <input
                                type="email"
                                v-model="email"
                                name="email"
                                id="email"
                                autocomplete="off"
                                autofocus
                                :class="emailHasContent"
                            />
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input
                                type="password"
                                v-model="password"
                                name="password"
                                id="password"
                                autocomplete="off"
                                autofocus
                                :class="passwordHasContent"
                            />
                            <label for="password">Password</label>
                        </div>
                    </div>
                </div>
                <p v-if="error !== null" class="error">{{ error.msg }}</p>

                <a href="#" class="btn btn-register" v-on:click="handleSubmit">
                    Login <span class="arrow-right" v-html="this.$ud_store.state.icons.arrow_right" />
                </a>
            </div>
            <a href="#back" class="cancel" @click="$router.go(-1)">Cancel</a>
        </div>
    </div>
</template>

<style lang="scss">
    @import '~@/_login-register.scss';
</style>

<script>
    import {
        validEmail,
        validPassword
    } from '../components/register/helpers/validators'

    export default {
        data(){
            return {
                email : "",
                password : "",
                error: null
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                let validatedEmail = validEmail(this.email);
                let validatedPassword = validPassword(this.password, this.password);

                if (validatedEmail.valid === false) {
                    this.error = validatedEmail;
                    return false;
                }

                if (validatedPassword.valid === false) {
                    this.error = validatedPassword;
                    return false;
                }

                axios({
                    method: 'POST',
                    data: {
                        email: this.email,
                        password: this.password
                    },
                    url: '/ai/user/auth',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                })
                .then(({data}) => {
                    if (data.success) {
                        let user_data = {
                            user_data: data.user,
                            loggedIn: true
                        }

                        this.$ud_store.commit('SET_USER_DATA', user_data.user_data)
                        this.$ud_store.commit('SET_USER_LOGGED_IN', user_data.loggedIn)

                        window.location = '/'
                    }
                    else {
                        this.error = {
                            vaild: false,
                            msg: data.message
                        }
                        return false
                    }
                })
                .catch((error) => {
                    this.error = {
                        vaild: false,
                        msg: error.response.data.message
                    }
                });
            }
        },
        computed: {
            emailHasContent: function() {
                return {
                    'has-content': this.email
                }
            },
            passwordHasContent: function() {
                return {
                    'has-content': this.password
                }
            }
        }
    }
</script>
<template>
    <div class="user-login-register-view">
        <div class="underlay" :style="{'background-image': `url(${require('../../images/anyideas-icon-pattern.svg')})`}"></div>
        <div class="container">
            <header>
                <router-link :to="{name: 'index'}" v-html="this.$ud_store.state.icons.logo_big"></router-link>
            </header>
            <div class="steps-container">
                <template v-if="stepIndex === 1">
                    <RegisterName v-on:onchange="updateParent" :name="name" :username="username" />
                </template>
                <template v-else-if="stepIndex === 2">
                    <RegisterEmail v-on:onchange="updateParent" :email="email" />
                </template>
                <template v-else-if="stepIndex === 3">
                    <RegisterPasswords v-on:onchange="updateParent" :password="password" :password_confirmation="password_confirmation" />
                </template>
                <template v-else-if="stepIndex === 4">
                    <RegisterInterests v-on:onpush="pushInterest" :interests="interests" />
                </template>

                <p v-if="error !== null" class="error">{{ error.msg }}</p>

                <a href="#" class="btn btn-register" v-bind:class="{ disabled: processing }" v-on:click="stepChange">
                    <template v-if="processing === false && stepIndex !== 4">
                        Next <span class="arrow-right" v-html="this.$ud_store.state.icons.arrow_right" />
                    </template>
                    <template v-else-if="processing === false && stepIndex === 4">
                        Get Started
                    </template>
                    <template v-else>
                        <loading />
                    </template>
                </a>

                <ul class="dots">
                    <li v-bind:class="{ active: stepIndex === 1}"></li>
                    <li v-bind:class="{ active: stepIndex === 2}"></li>
                    <li v-bind:class="{ active: stepIndex === 3}"></li>
                    <li v-bind:class="{ active: stepIndex === 4}"></li>
                </ul>
            </div>
            <a href="#back" class="cancel" @click="$router.go(-1)">Cancel</a>
        </div>
    </div>
</template>

<style lang="scss">
    @import '~@/_login-register.scss';
</style>

<script>
    import RegisterName from '../components/register/RegisterName'
    import RegisterEmail from '../components/register/RegisterEmail'
    import RegisterPasswords from '../components/register/RegisterPasswords'
    import RegisterInterests from '../components/register/RegisterInterests'

    import {
        validName,
        validUsername,
        validEmail,
        validPassword,
        validInterests
    } from '../components/register/helpers/validators'

    export default {
        components: {
            RegisterName,
            RegisterEmail,
            RegisterPasswords,
            RegisterInterests
        },
        data(){
            return {
                name : null,
                username: null,
                email: null,
                interests: [],
                password : null,
                password_confirmation: null,
                stepIndex: 1,
                error: null,
                processing: false
            }
        },
        methods : {
            updateParent(e) {
                this[e.target.name] = e.target.value
            },
            pushInterest(cat) {
                let index = this.interests.indexOf(cat)
                if (index === -1) {
                    if (this.interests.length === 3) {
                        return false;
                    }
                    this.interests.push(cat)
                }
                else {
                    this.interests.splice(index, 1);
                }
            },
            returnValidateRegisterResponse(data, errorMsg) {
                if (data.user !== null) {
                    this.error = {
                        valid: false,
                        msg: errorMsg
                    }
                    this.processing = false
                    return false
                }
                else {
                    this.stepIndex++
                    this.processing = false
                    return true
                }
            },
            stepChange(e) {
                e.preventDefault();
                this.error = null
                switch (this.stepIndex) {
                    // Name & Username validation
                    case 1: {
                        // console.log('Validate Name fields');
                        let validatedName = validName(this.name),
                            validatedUsername = validUsername(this.username)

                        if (validatedName.valid !== true) {
                            this.error = validatedName
                            return false
                        }

                        if (validatedUsername.valid !== true) {
                            this.error = validatedUsername
                            return false
                        }

                        this.processing = true
                        axios.post('/ai/user/validateRegister', { key: 'username', value: this.username })
                            .then(({data}) => {
                                return this.returnValidateRegisterResponse(data, 'Username is already taken :(')
                            })
                            .catch(e => console.error(e))
                        break;
                    }
                    // Email validation
                    case 2: {
                        let validatedEmail = validEmail(this.email)

                        if (validatedEmail.valid !== true) {
                            this.error = validatedEmail
                            return false
                        }

                        this.processing = true
                        axios.post('/ai/user/validateRegister', { key: 'email', value: this.email })
                            .then(({data}) => {
                                return this.returnValidateRegisterResponse(data, 'Email is already in use')
                            })
                            .catch(e => console.error(e))
                        break;
                    }
                    case 3: {
                        let validatedPasswords = validPassword(this.password, this.password_confirmation)
                        if (validatedPasswords.valid === false) {
                            this.error = validatedPasswords;
                            return false
                        }
                        else {
                            this.stepIndex++;
                        }
                        break;
                    }
                    case 4: {
                        let validatedInterests = validInterests(this.interests)
                        if (validatedInterests.valid === false) {
                            this.error = validatedInterests
                            return false
                        }

                        // console.log('Submit that shizzle')
                        this.processing = true
                        this.handleSubmit();
                        break;
                    }
                }
            },
            handleSubmit() {
                // e.preventDefault()

                console.log(this.name)
                console.log(this.username)
                console.log(this.email)
                console.log(this.interests)
                console.log(this.password)

                // PATH TO REGISTER ROUTE app\Http\Controllers\Auth\RegisterController.php
                // make sure validator items are met - if not, change them
                
                // data items need to be stringify'd before pushing to the DB
                // return items need to be parsed back into arrays/objects

                axios({
                    method: 'POST',
                    data: {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        interests: JSON.stringify(this.interests),
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    },
                    url: '/ai/user/register',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                })
                .then(response => {
                    console.log("register response")
                    console.log(response)
                    if (response.status === 200 || response.status === 201) {
                        window.location = '/';
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
    }
</script>
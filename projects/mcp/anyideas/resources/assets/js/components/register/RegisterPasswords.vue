<template>
    <div class="step step-1">
        <blockquote>
            <p>“Love is great, but not as a password”</p>
            <cite>MATT MULLENWEG</cite>
        </blockquote>
        <div class="form-block">
            <div class="input-field">
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-on:input="onChange"
                    :class="passwordHasContent"
                    autocomplete="off"
                    autofocus
                />
                <label for="password">Password</label>
            </div>
            <div class="input-field">
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-on:input="onChange"
                    :class="passwordConfHasContent"
                    autocomplete="off"
                    autofocus
                />
                <label for="password_confirmation">Confirm Password</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterPasswords',
        props: ['password', 'password_confirmation'],
        methods: {
            onChange(e) {
                this.$emit('onchange', e)
            }
        },
        computed: {
            passwordHasContent: function() {
                return {
                    'has-content': this.password
                }
            },
            passwordConfHasContent: function() {
                return {
                    'has-content': this.password_confirmation
                }
            }
        }
    }
</script>

<template>
    <div class="step step-1">
        <blockquote>
            <p>“If I’m gonna tell a real story, I’m gonna start with my name”</p>
            <cite>Kendrick Lamar</cite>
        </blockquote>
        <div class="form-block">
            <div class="input-field">
                <input
                    type="text"
                    name="name"
                    id="name"
                    v-on:input="onChange"
                    :class="nameHasContent"
                    autofocus
                    autocomplete="off"
                />
                <label for="name">Name</label>
            </div>
            <div class="input-field">
                <input
                    type="text"
                    name="username"
                    id="username"
                    v-on:input="onChange"
                    :class="usernameHasContent"
                    autocomplete="off"
                />
                <label for="name">Username</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterName',
        props: ['name', 'username'],
        methods: {
            onChange(e) {
                this.$emit('onchange', e)
            }
        },
        computed: {
            nameHasContent: function() {
                return {
                    'has-content': this.name
                }
            },
            usernameHasContent: function() {
                return {
                    'has-content': this.username
                }
            }
        }
    }
</script>

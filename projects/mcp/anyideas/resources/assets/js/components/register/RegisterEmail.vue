<template>
    <div class="step step-1">
        <blockquote>
            <p>“The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.”</p>
            <cite>CARL JUNG</cite>
        </blockquote>
        <div class="form-block">
            <div class="input-field">
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-on:input="onChange"
                    :class="emailHasContent"
                    autocomplete="off"
                    autofocus
                />
                <label for="email">Email</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterEmail',
        props: ['email'],
        methods: {
            onChange(e) {
                this.$emit('onchange', e)
            }
        },
        computed: {
            emailHasContent: function() {
                return {
                    'has-content': this.email
                }
            }
        }
    }
</script>

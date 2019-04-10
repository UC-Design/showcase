<template>
    <div class="container">
        <div class="wrapper">
            <div  class="form-wrapper">
                <div>
                    <header class="header-container">
                        <div class="header-wrapper fixed_width">
                            <div class="form no-label" id="title">
                                <label for="title">Name of Idea</label>
                                <input placeholder="Name of Idea" type="text" class="input_reset" v-model="idea.title" required>
                            </div>

                            <div class="form-group row no-label" id="elevator">
                                <label for="pitch">Elevator Pitch (240 Characters)</label>
                                <textarea rows="8" placeholder="Elevator Pitch (240 Characters)" type="text" class="input_reset" v-model="idea.pitch" required/>
                            </div>

                            <div class="status_category">
                                <div class="form-group row no-label" id="status">
                                    <label for="status">Status</label>
                                    <v-select v-model="idea.status" placeholder="Status" label="status" :options="options_status"></v-select>
                                </div>

                                <div class="form-group row no-label" id="category">
                                    <label for="category">Category</label>
                                    <v-select v-model="idea.category" placeholder="Category" label="category" :options="options_category"></v-select>
                                </div>
                            </div>

                            <div class="form-group row" id="tags">
                                <label for="tags">Tags</label>
                                <div class="tags_select">
                                    <input-tag v-model="idea.tags" placeholder="+"></input-tag>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div class="page-wrapper">
                        <div class="fixed_width project-description-wrapper">
                            <h1>Project Description</h1>
                            <p>A rundown of the idea and what you might be having trouble with.</p>
                            <markdown-editor v-model="idea.description" ref="markdownEditor" :configs="configs"></markdown-editor>

                            <div class="form-group post-idea-container">
                                <div class="error" v-if="error">
                                    <p>{{ error.msg }}</p>
                                </div>
                                <button class="trash" @click="cancelCreation"><span v-html="this.$ud_store.state.icons.trash" /></button>
                                <button type="submit" class="post-idea" @click="handleSubmit">Post Idea</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~@/_variables.scss';
    @import '~simplemde/dist/simplemde.min.css';
    input, textarea {
        display: block;
        width: 100%;
        &:focus {
            outline: none;
        }
        &:-ms-input-placeholder {
            color: $grey-med;
        }
        &::-webkit-input-placeholder {
            color: $grey-med;
        }
        &::placeholder {
            color: $grey-med;
        }
    }
    .error {
        align-self: center;
        p {
            color: $error-color;
            margin: 0;
        }
    }
</style>

<style lang="scss">
    @import '~@/_variables.scss';

    .please_log_in {
        width: 100%;
        padding: 25vh 25%;
        text-align: center;
    }

    .form-wrapper {
        .no-label {
            label {
                display: none;
            }
        }
    }

    .post-idea-container {
        padding: 48px 0 0;
        display: flex;
        justify-content: flex-end;
        button {
            margin-left: 20px;
            cursor: pointer;
            &.trash {
                background: $black;
                width: 46px;
                height: 46px;
                padding: 0;
                border: none;
                color: rgba($pure, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                span {
                    display: block;
                }
            }
        }
    }

    .post-idea {
        font-size: 20px;
        background-color: $primary;
        color: $pure;
        border-radius: 200px;
        padding: 10px 30px;
        text-decoration: none;
        border: none;
        box-shadow: 0 3px 6px 0 rgba($black, 0.16);
        font-family: $font-family-sans-serif;
        &:focus {
            outline: none;
        }
    }

    .project-description-wrapper {
        > h1,
        > p {
            margin: 0;
        }
        > p {
            color: $grey-dark;
            margin-bottom: 25px;
        }
        .editSection {
            margin-top: 30px;
        }
    }

    .input_reset {
        -webkit-appearance: none;
        border: none;
        background-color: transparent;
        font-family: $font-family-sans-serif;
    }

    .header-container {
        width: 100%;
        background-color: $white;
        padding: 25px 0 100px;
        .header-wrapper {
            margin: 0 auto;            
            #title {
                input {
                    text-align: left;
                    font-size: 36px;
                    font-weight: $w-bold;
                    color: $black;
                }
            }

            #elevator {
                margin: 30px 0 0;
                textarea {
                    color: $black;
                    max-width: 450px;
                    font-family: $font-family-sans-serif;
                    font-size: 16px;
                    padding: 0;
                }
            }
            .status_category {
                width: 100%;
                max-width: 450px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 20px;
                margin-top: 30px;
            }
            #status, #category {
                font-size: 16px;
                color: black;
                button {
                    display: none;
                }
                > div {
                    > div {
                        > div {
                            
                        }
                    }
                }
            }
            .v-select.single {
                .dropdown-toggle {
                    padding-bottom: 5px;
                    border-radius: 0px;
                    border: none;
                    border-bottom: 1px solid $black;
                    .vs__selected-options {
                        padding: 0;
                        > input {
                            font-family: $font-family-sans-serif;
                            margin: 0;
                            border: none;
                            padding: 0 5px;
                            line-height: 1.6;
                        }
                        .selected-tag {
                            padding: 0 5px;
                            line-height: 1.6;
                            margin: 0;
                            border: none;
                        }
                    }
                    .vs__actions {
                        padding: 0 0 0 5px;
                        .open-indicator {
                            &:before {
                                border-color: $black;
                                border-width: 1px 1px 0 0;
                            }
                        }
                    }
                    & + .dropdown-menu {
                        border: none;
                        box-shadow: 0 3px 6px 0 rgba($black, 0.16);
                        border-radius: 5px;
                    }
                }
            }

            .v-select.single .selected-tag {
                background-color: transparent;
                border-color: transparent;
                position: absolute;
            }
            #tags {
                max-width: 450px;
                font-size: 16px;
                color: $black;
                margin: 30px 0 0;
                .tags_select {
                    width: 100%;
                    color: white;
                    margin: 10px 0 0;
                    background-color: transparent;
                    border-bottom: 1px solid $black;
                    padding: 0 2px;
                    > div {
                        border: none;
                        padding: 0;
                        background: transparent;
                        .input-tag {
                            background-color: $black;
                            color: white;
                            border-radius: 200px;
                            padding: 8px 30px 9px 20px;
                            border: none;
                            font-size: 14px;
                            position: relative;
                            > span {
                                font-size: 1em;
                                font-weight: $w-bold;
                                line-height: 1.3;
                                display: block;
                                text-transform: uppercase;
                            }
                            .remove {
                                color: rgba($pure, 0.5);
                                position: absolute;
                                top: 50%;
                                right: 10px;
                                transform: translateY(-50%);
                            }
                        }
                        input {
                            border: none;
                            color: $black;
                            font-size: 16px;
                            border-radius: 0;
                            margin: 0;
                            font-family: $font-family-sans-serif;
                        }
                    }
                }
            }
        }
    }

    .description_input {
        width: 100%;
        margin: 48px 0;
        textarea {
            width: 100%;
        }   
    }
</style>
    
<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor'

    export default {
        name: 'AddNewIdea',
        components: {
            markdownEditor
        },
        data() {
            return {
                loaded: false,
                idea: {
                    title: '',
                    pitch: '',
                    status: '',
                    category: '',
                    tags: [],
                    description: '',
                },
                options_category: [],
                options_status: [],
                ideaData: [],
                error: null,
                configs: {
                    hideIcons: ['image', 'link', 'preview']
                }
            }
        },
        beforeMount() {
            let categories = this.$ud_store.state.categories,
                status = this.$ud_store.state.status

            this.options_category = categories.map(cat => ({ category: this.$capitalise(cat) }) )
            this.options_status = status.map(stat => ({ status: stat }))
        },
        methods: {
            prepareForSubmission() {
                let idea = this.idea
                let error = null

                for (let key in idea) {
                    let type = typeof idea[key]
                    if (type !== 'object') {
                        if (!idea[key] || !idea[key].trim()) {
                            return {
                                valid: false,
                                msg: `'${this.$capitalise(key)}' is empty`
                            }   
                        }
                    }
                    else {
                        if (Object.keys(idea[key]).length === 0 || idea[key].length === 0) {
                            return {
                                valid: false,
                                msg: `'${this.$capitalise(key)}' is empty`
                            }
                        }
                    }
                }

                let category = idea.category.category.toLowerCase()
                let status = idea.status.status.toLowerCase()
                let tags = idea.tags.map(tag => tag.toLowerCase().replace(/[\W_]+/g, ''))

                return {
                    valid: true,
                    idea: {
                        title: idea.title.trim(),
                        pitch: idea.pitch.trim(),
                        status: status,
                        category: category,
                        tags: JSON.stringify(tags),
                        description: this.idea.description
                    }
                }
            },
            handleSubmit() {
                this.error = null

                let validated = this.prepareForSubmission()

                if (validated.valid === false) {
                    this.error = validated
                    return false
                }

                axios({
                    method: 'POST',
                    url: '/ai/idea/create',
                    data: validated.idea,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
                    }
                })
                .then(res => {
                    console.warn('​handleSubmit -> response', res);
                    // if (response.status === 200) {
                    //     window.location = '/';
                    // }
                    this.$router.push({ path: `/idea/${res.data.id}`})
                    
                    // console.log('run this.handleGetIdeaData()');
                    // this.handleGetIdeaData()
                })
                .catch(error => {
                    console.error(error);
                    this.error = {
                        valid: false,
                        msg: error.response.data.message
                    }
                });
            },
            cancelCreation(e) {
                e.preventDefault();
                if (window.confirm('Are you sure you want to cancel?')) {
                    this.$router.go(-1);
                }
            }
        }
    }
</script>
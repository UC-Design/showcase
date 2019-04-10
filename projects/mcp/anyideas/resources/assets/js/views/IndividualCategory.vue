<template>
    <div class="container fixed_width">
        <div class="row">
            <CategoryTitleCard :props="currentRoute" class="category-header"/>
            <div class="idea_wrapper page-wrapper">
              <template v-if="category_data.length !== 0">
                <template v-for="(value, key) in category_data">
                    <IdeaCard :key="key" :props='value' />
                </template>
              </template>
              <template v-else>
                  <noideas />
              </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
  .header{
    h1 {
      text-transform: capitalize;
    }
  }
</style>

<script>
import * as hero from 'hero-patterns'
import IdeaCard from '../components/IdeaCard'
import CategoryTitleCard from '../components/CategoryTitleCard'
  export default {
    components: {
      IdeaCard, CategoryTitleCard
    },
    data() {
      return {
        category_data: [],
        currentRoute: this.$ud_store.state.current_category_id
      }
    },
    beforeMount() {
      this.setRoute();
    },
    mounted() {
      // console.log('this.$route.params.id => ', this.$route.params.id)
      console.log('this.category_data => ', this.category_data)
      console.log('this.category_data.length => ', this.category_data.length)
      console.log('this.$ud_store.state.current_category_id => ', this.$ud_store.state.current_category_id)
      
      // this.handleGetIdeaByCategories(this.$route.params.id);
      if (this.category_data === null || this.category_data === undefined || this.category_data.length === 0) {
        this.setRoute();
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': ['setRoute']
    },
    // updated() {
    //   this.setRoute();
    // },
    methods: {
      // get ideas by Categories functions
      setRoute() {
        console.log('setRoute()')
        this.currentRoute = this.$ud_store.state.current_category_id;
        this.handleGetIdeaByCategories();
      },
      handleGetIdeaByCategories() {
        console.log('this.$ud_store.state.current_category_id', this.$ud_store.state.current_category_id)
        console.log(this.$ud_store.state.current_category_id)
        axios({
          method: 'POST',
          url: '/ai/idea/get-by-category/' + this.$ud_store.state.current_category_id,
        }).then( res => {
          console.log('TCL: handleGetIdeaByCategories -> res', res);
          console.log('TCL: handleGetIdeaByCategories -> res.data', res.data);
            this.category_data = res.data;
            console.warn('this.category_data => ', this.category_data)
        });
      }
    }
  }
</script>
<template>
    <div class="container">
        <div v-for="item in subdivisions" class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="btn-group btn-group-sm ml-auto" role="group">
                        <button type="button" class="btn btn-warning" v-on:click="modalEditShow(row.item)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger" v-on:click="modalDeleteShow(row.item.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <h4 class="mb-2">{{ item.name }}</h4>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Subdivisions",
    computed: {
      subdivisions: function () {

        return this.$store.getters.subdivisions
        }
    },
    mounted() {
      this.$store.dispatch('getSubdivisions')
    }
  }
</script>

<style scoped>

</style>

<template>
    <div>
        <table class="table" >
            <thead>
            <tr>
                <th v-for="field in fields" :key="field.key">{{ field.label  }} </th>
            </tr>
            </thead>

            <tbody>
            <template v-for="item in itemsOnPage">
                <tr>
                    <td v-for="field in fields">
                        <slot :name="field.key" :data="item" :toggleDetails="toggleDetail" >{{  item[field.key] || '' }}</slot>
                    </td>
                </tr>

                <tr v-if="item.detailIsShowing">
                    <td :colspan="fields.length">
                        <slot name="details" :data="item"></slot>
                    </td>
                </tr>

            </template>
            </tbody>

        </table>

        <nav>
            <ul class="pagination justify-content-end mr-5">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
  export default {
    name: "TableComponent",
    props: ["fields", "items", "perPage", "currentPage"],
    computed: {
      itemsOnPage() {
        return this.items.slice((this.currentPage - 1) * this.perPage)
      }
    },
    methods: {

      toggleDetail: function (item) {

        if (item.hasOwnProperty('detailIsShowing')) {

          item.detailIsShowing = !item.detailIsShowing
        } else {
            this.$set(item, 'detailIsShowing', true)
          //item.detailIsShowing = true
        }

        let targetIndex = this.items.findIndex(object => object.id === item.id)
        console.log(targetIndex)
        this.items.splice(targetIndex, 1, item);

      },

      nextPage: function () {
        this.currentPage++
      },

      previousPage: function () {
        if (this.currentPage > 1)
            this.currentPage--
      }
    }
  }
</script>

<style scoped>

</style>

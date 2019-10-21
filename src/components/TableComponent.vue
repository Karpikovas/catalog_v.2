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
        <ul class="pagination mr-5 b-pagination justify-content-end">
            <li tabindex="-1" class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage = 1">
                «
            </li>
            <li tabindex="-1" class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage--">
                ‹
            </li>
            <li tabindex="-1" class="page-item" @click="currentPage++" :class="{ disabled: currentPage >= items.length / perPage }">
                ›
            </li>
            <li tabindex="-1" class="page-item" :class="{ disabled: currentPage >= items.length / perPage }"  @click="currentPage = items.length / perPage">
                »
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "TableComponent",
    props: {
      fields: Array,
      items: Array,
      perPage: Number
    },
      data () {
        return {
            currentPage: 1
        }
      },
    computed: {
      itemsOnPage() {
        let start = (this.currentPage - 1) * this.perPage
        let end = start + this.perPage
        return this.items.slice(start, end)
      }
    },
    methods: {

      toggleDetail: function (item) {

        if (item.hasOwnProperty('detailIsShowing')) {

          item.detailIsShowing = !item.detailIsShowing
        } else {
            this.$set(item, 'detailIsShowing', true)
        }

        let targetIndex = this.items.findIndex(object => object.id === item.id)
        this.items.splice(targetIndex, 1, item);

      }
    }
  }
</script>

<style scoped>

</style>

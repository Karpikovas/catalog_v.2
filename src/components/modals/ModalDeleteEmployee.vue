<template>
    <div class="modal" aria-hidden="true" :class="{ opened: value }">
        <div class="modal-dialog">
            <div class="modal-header">
                <h2>Удалить</h2>
                <a href="#" class="btn-close" aria-hidden="true" @click.prevent="toggle(false)">&times;</a>
            </div>
            <div class="modal-body text-center">
                Удалить информацию о сотруднике?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="toggle(false)">Отменить</button>
                <button type="button" class="btn btn-danger" @click.prevent="onDeleteClick">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalDeleteEmployee",
        props: {
            value: Boolean,
            employee: Object
        },
        methods: {
            toggle(value) {
                this.$emit('input', value);
            },
            onDeleteClick() {
                this.$store.dispatch('deleteEmployee', employees.id)
            }
        }
    }
</script>

<style scoped>

</style>
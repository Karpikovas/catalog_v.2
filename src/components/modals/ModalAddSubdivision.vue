<template>
    <div class="modal" aria-hidden="true" :class="{ opened: value }">
        <div class="modal-dialog">
            <div class="modal-header">
                <h2>{{ title }}</h2>
                <a href="#" class="btn-close" aria-hidden="true" @click.prevent="toggle(false)">&times;</a>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row mb-3">
                        <div class="col-3">Название:</div>
                        <div class="col">
                            <input type="text" placeholder="Введите название подразделения" class="form-control" v-model="newEmployeeForm.fullName">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">Дата рождения:</div>
                        <div class="col">
                            <textarea type="text" class="form-control" v-model="newEmployeeForm.birthday"></textarea>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="toggle(false)">Отменить</button>
                <button type="button" class="btn btn-primary" @click.prevent="onAddClick">Добавить</button>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "ModalAddSubdivision"
  }
</script>

<style scoped>

</style>

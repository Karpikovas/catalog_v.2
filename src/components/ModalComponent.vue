<template>
    <div class="modal" aria-hidden="true" :class="{ opened: value }">
        <div class="modal-dialog">
            <div class="modal-header">
                <h2>Добавление</h2>
                <a href="#" class="btn-close" aria-hidden="true" @click.prevent="toggle(false)">&times;</a>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row mb-3">
                        <div class="col-3">Фото:</div>
                        <div class="col">
                            <img  alt="photo" src="" width="168" height="168" class="img-thumbnail img-fluid">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3"></div>
                        <div class="col">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="file">
                                <label data-browse="Открыть" class="custom-file-label" for="file">Добавить фотографию...</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">ФИО:</div>
                        <div class="col">
                            <input type="text" placeholder="Введите полное имя сотрудника" class="form-control" aria-describedby="input-formatter-help" id="__BVID__133">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">Дата рождения:</div>
                        <div class="col">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">Подразделение / Должность:</div>
                        <div class="col">
                            <select class="custom-select" id="__BVID__135">
                                <option value="ылвадфлыоа">ылвадфлыоа</option>
                                <option value="rrr">rrr</option>
                            </select>
                        </div>
                        <div class="col">
                            <select>
                                <option value="Директор">Директор</option>
                                <option value="Руководитель проекта">Руководитель проекта</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">Оклад / Ставка:</div>
                        <div class="col">
                            <input type="number" placeholder="Оклад" min="0.00" class="form-control" aria-describedby="input-formatter-help">
                        </div>
                        <div class="col">
                            <input type="number" placeholder="Ставка" min="0.00" class="form-control" aria-describedby="input-formatter-help" id="__BVID__138">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Отменить</button>
                <button type="button" class="btn btn-primary">Добавить</button>
            </div>
        </div>
    </div>
    <!--&lt;!&ndash; /Modal &ndash;&gt;-->

    <!--<h1>Dead Simple Modal</h1>-->
    <!--<p><a href="#" class="btn btn-big openmodale" @click.prevent="isOpened = !isOpened">Open Login Box</a></p>-->

</template>

<script>
  export default {
    props: {
      value: Boolean
    },
    name: "ModalComponent",
    methods: {
      toggle (value) {

          this.$emit('input', value);

      }
    }
  }
</script>

<style scoped>


</style>

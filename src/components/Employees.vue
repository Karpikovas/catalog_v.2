<template>
    <div class="container-fluid main">

        <!--------------------- Спиннер ------------------------>

        <template v-if="inProgress">
            <div class="d-flex justify-content-center mb-3">
                <div class="spinner-border text-success"></div>
            </div>
        </template>

        <template v-else>
            <div class="row">

        <!--------------------- Колонка с подразделениями  -------------------->

                <div class="col-2 position-fixed divider">
                    <ul class="nav justify-content-center text-center">
                        <li class="nav-item col mb-3">
                            Подразделения
                        </li>
                        <li v-for="subdivision in subdivisions" class="nav-item col mb-3">
                            {{ subdivision.name }}
                        </li>
                        <li class="nav-item col mb-3">
                            <button class="btn btn-outline-primary">Подробнее о подразделениях</button>
                        </li>
                    </ul>
                </div>

                <div class="col offset-md-2">
                    <table class="table">
                        <thead>
                            <th v-for="field in fields"> {{ field }}</th>
                        </thead>

                    </table>
                </div>

            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Employees",
        data() {
            return {
                inProgress: false,
                fields: ['Сотрудник', 'Подразделение', 'Должность', 'Подробности', 'Действия'],
                subdivisions: [ { name: 'Южное' }, { name: 'Северное' }, { name: 'Западное' }, { name: 'Восточное' }, ]
            }
        }
    }
</script>

<style scoped lang="less">
    .container-fluid {
        padding-top: 65px;
        min-height: 100%;
        height:auto !important; /* cross-browser */
        height: 100%;

        .nav {
            font-weight: bold;

            li.nav-item a {
                color: green;

                &.disabled {
                    color: dimgrey;
                }
            }

            span {
                border-bottom: 2px solid #dee2e6;
                border-radius: 1px;
            }

        }
    }

    .divider {
        border-right: 1px solid #dee2e6;
        border-radius: 1px;
        height: 100%;
    }

    .spinner-border {
        position: absolute;
        top: 40%;
        width: 5rem;
        height: 5rem;
    }
</style>
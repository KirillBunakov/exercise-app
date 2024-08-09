<template>
  <div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
      <div class="modal">
        <h3>Добавить новое упражнение в библиотеку</h3>
        <hr>

        <form class="form-control" @submit.prevent="$emit('addNewExercise', title, type, lvl, duration, repeat, approach, content)">
          <label for="title">Название упражнения:</label>
          <input type="text" id="title" v-model="title">
          <br>

          <label for="type">Тип упражнения:</label>
          <select id="type" v-model="type">
            <option value="Кардио">Кардио</option>
            <option value="Силовое">Силовое</option>
            <option value="На выносливость">На выносливость</option>
            <option value="Растяжка">Растяжка</option>
            <option value="Дыхательное">Дыхательное</option>
            <option value="Восстановительное">Восстановительное</option>
          </select>
          <br>

          <label for="lvl">Сложность:</label>
          <select id="lvl" v-model="lvl">
            <option value="Начальный">Начальный</option>
            <option value="Средний">Средний</option>
            <option value="Продвинутый">Продвинутый</option>
          </select>
          <br>

          <label for="duration">Продолжительность повторения:</label>
          <input type="text" id="duration" v-model="duration">
          <br>

          <label for="repeat">Количество повторений:</label>
          <input type="text" id="repeat" v-model="repeat">
          <br>

          <label for="approach">Количество подходов:</label>
          <input type="text" id="approach" v-model="approach">
          <br>

          <label for="content">Описание упражнения:</label>
          <textarea type="text" rows="2" id="content" v-model="content"></textarea>
          <br>
          <button class="btn primary" :disabled="title ==='' || type === '' || lvl === '' || content === '' || duration === '' && repeat === '' && approach === ''">Добавить упражнение</button>
        </form>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['close', 'addNewExercise'],
  setup () {
    const title = ref('')
    const type = ref('')
    const lvl = ref('')
    const duration = ref('')
    const repeat = ref('')
    const approach = ref('')
    const content = ref('')

    return {
      title, type, lvl, duration, repeat, approach, content
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

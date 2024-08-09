<template>
  <div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
      <div class="modal" v-if="edit === false">
        <h3>{{ exercise.exсTitle }}</h3>
        <p>Тип: {{ exercise.exсType }}</p>
        <p>Сложность: {{ exercise.exсLvl }}</p>
        <p v-if="exercise.excDuration > 0">Продолжительность повторения: {{ exercise.excDuration }}</p>
        <p v-if="exercise.excRepeat.length > 0">Количество повторений: {{ exercise.excRepeat }}</p>
        <p>Количество подходов: {{ exercise.excApproach }}</p>
        <p>Описание: {{ exercise.excContent }}</p>
        <button class="btn" @click="$emit('add', exercise)">Добавить</button>
        <button class="btn primary" @click="edit = true">Редактировать</button>
      </div>
      <form class="modal form-control" v-else @submit.prevent="$emit('editExercise', currentIdOfTask, newTitle, newType, newLvl, newDuration, newRepeat, newApproach, newContent)">
        <label for="title">Название упражнения:</label>
        <input type="text" id="title" v-model="newTitle">
        <br>

        <label for="type">Тип упражнения:</label>
        <select id="type" v-model="newType">
          <option value="Кардио">Кардио</option>
          <option value="Силовое">Силовое</option>
          <option value="На выносливость">На выносливость</option>
          <option value="Растяжка">Растяжка</option>
          <option value="Дыхательное">Дыхательное</option>
          <option value="Восстановительное">Восстановительное</option>
        </select>
        <br>

        <label for="lvl">Сложность:</label>
        <select id="lvl" v-model="newLvl">
          <option value="Начальный">Начальный</option>
          <option value="Средний">Средний</option>
          <option value="Продвинутый">Продвинутый</option>
        </select>
        <br>

        <label for="duration">Продолжительность повторения:</label>
        <input type="text" id="duration" v-model="newDuration">
        <br>

        <label for="repeat">Количество повторений:</label>
        <input type="text" id="repeat" v-model="newRepeat">
        <br>

        <label for="approach">Количество подходов:</label>
        <input type="text" id="approach" v-model="newApproach">
        <br>

        <label for="content">Описание упражнения:</label>
        <textarea type="text" rows="2" id="content" v-model="newContent"></textarea>
        <br>
        <button class="btn primary" :disabled="newTitle ==='' || newType === '' || newLvl === '' || newContent === '' || newDuration === '' && newRepeat === '' && newApproach === ''">Изменить</button>
        <button class="btn danger" @click="$emit('close')">Отменить</button>
      </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  emits: ['close', 'editExercise', 'add'],
  props: ['currentIdOfTask', 'exercises'],
  setup (props) {
    const exercise = computed(() => {
      return props.exercises.find(e => e.id === props.currentIdOfTask)
    })
    const newTitle = ref(exercise.value.exсTitle)
    const newType = ref(exercise.value.exсType)
    const newLvl = ref(exercise.value.exсLvl)
    const newDuration = ref(exercise.value.excDuration)
    const newRepeat = ref(exercise.value.excRepeat)
    const newApproach = ref(exercise.value.excApproach)
    const newContent = ref(exercise.value.excContent)
    const edit = ref(false)
    return {
      exercise, edit, newTitle, newType, newLvl, newDuration, newRepeat, newApproach, newContent
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>

<template>
  <div class="container with-nav">
    <div class="card">
      <h1>Мои упражнения</h1>
    </div>

    <div class="card__exercises" v-if="myExcercises">
      <div class="card exercise" :key="exercise.id" v-for="exercise in myExcercises" @click="showModal = true, currentIdOfTask = exercise.id">
        <h3>{{ exercise.exсTitle }}</h3>
        <p>Тип: {{ exercise.exсType }}</p>
        <p>Сложность: {{ exercise.exсLvl }}</p>
        <p v-if="exercise.excDuration > 0">Продолжительность повторения: {{ exercise.excDuration }}</p>
        <p v-if="exercise.excRepeat.length > 0">Количество повторений: {{ exercise.excRepeat }}</p>
        <p>Количество подходов: {{ exercise.excApproach }}</p>
        <p>Описание: {{ exercise.excContent }}</p>
        <!-- <div class="btn_edit">
          <button class="btn danger" @click="currentIdOfTask = exercise.id, removeExercise()">Удалить</button>
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const myExcercises = computed(() => store.state.myExc)
    return {
      myExcercises
    }
  }
}
</script>

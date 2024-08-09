<template>
  <div class="container with-nav">
    <div class="card">
      <h2>Библиотека упражнений</h2>
      <p>Всего упражнений: {{ countOfTask }}</p>
      <div class="filter">
        <div class="filter__content">
          <label for="filterName">Фильтр по названию: {{ filterName }}</label>
          <input type="text" id="filterName" v-model="filterName" @input="filterByName">
        </div>
        <div class="filter__content">
          <label for="filterType">Фильтр по типу:</label>
          <select id="filterType" v-model="filterType" @change="filterByType">
            <option value="Все">Все</option>
            <option value="Кардио">Кардио</option>
            <option value="Силовое">Силовое</option>
            <option value="На выносливость">На выносливость</option>
            <option value="Растяжка">Растяжка</option>
            <option value="Дыхательное">Дыхательное</option>
            <option value="Восстановительное">Восстановительное</option>
          </select>
        </div>
        <div class="filter__content">
          <label for="filterLvl">Фильтр по сложности: {{ filterLvl }}</label>
          <select id="filterLvl" v-model="filterLvl" @change="filterByLvl">
            <option value="Все">Все</option>
            <option value="Начальный">Начальный</option>
            <option value="Средний">Средний</option>
            <option value="Продвинутый">Продвинутый</option>
          </select>
        </div>
      </div>
      <div class="btn-div">
        <button class="btn" @click="loadExercises">Показать все упражнения</button>
        <button class="btn" @click="addModal = true">Добавить упражнение в библиотеку</button>
      </div>
    </div>
    <div class="card__exercises" v-if="countOfTask > 0">
      <div class="card exercise" :key="exercise.id" v-for="exercise in exercises" @click="showModal = true, currentIdOfTask = exercise.id">
        <h3>{{ exercise.exсTitle }}</h3>
        <p>Тип: {{ exercise.exсType }}</p>
        <p>Сложность: {{ exercise.exсLvl }}</p>
        <!-- <p v-if="exercise.excDuration > 0">Продолжительность повторения: {{ exercise.excDuration }}</p>
        <p v-if="exercise.excRepeat.length > 0">Количество повторений: {{ exercise.excRepeat }}</p>
        <p>Количество подходов: {{ exercise.excApproach }}</p> -->
        <div class="btn_edit">
          <button class="btn danger" @click="currentIdOfTask = exercise.id, removeExercise()">Удалить</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <h3>Упражнений в библиотеке: {{ countOfTask }}</h3>
        <button class="btn" @click="addModal = true">Добавить упражнение в библиотеку</button>
      </div>
    </div>
    <teleport to="body">
      <add-modal
      @close="close"
      v-if="addModal === true"
      @addNewExercise="addNewExercise"
      ></add-modal>
    </teleport>

    <teleport to="body">
      <show-modal
      v-if="showModal === true"
      :currentIdOfTask="currentIdOfTask"
      :exercises="exercises"
      @close="close"
      @editExercise="editExercise"
      @add="addToMyExc"
      ></show-modal>
    </teleport>

  </div>

</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'
import AddModal from './AddModal.vue'
import showModal from './showModal.vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const exercises = ref([])
    const temp = ref([])
    const addModal = ref(false)
    const showModal = ref(false)
    const filterType = ref('Все')
    const filterName = ref('')
    const filterLvl = ref('Все')
    const currentIdOfTask = ref()
    const store = useStore()
    const exc = computed(() => store.state.myExc)

    function addToMyExc (exercise) {
      showModal.value = false
      return store.commit('addExc', exercise)
    }

    async function loadExercises () {
      try {
        const { data } = await axios.get('https://vue-exercises-app-default-rtdb.firebaseio.com/exercises.json')
        exercises.value = Object.keys(data).map(key => {
          return {
            id: key,
            exсTitle: data[key].exсTitle,
            exсType: data[key].exсType,
            exсLvl: data[key].exсLvl,
            excDuration: data[key].excDuration,
            excRepeat: data[key].excRepeat,
            excApproach: data[key].excApproach,
            excContent: data[key].excContent
          }
        })
        temp.value = exercises.value
      } catch (error) {
        console.log(error.message)
      }
    }

    async function addNewExercise (title, type, lvl, duration, repeat, approach, content) {
      const response = await fetch('https://vue-exercises-app-default-rtdb.firebaseio.com/exercises.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exсTitle: title,
          exсType: type,
          exсLvl: lvl,
          excDuration: duration,
          excRepeat: repeat,
          excApproach: approach,
          excContent: content
        })
      })
      const firebaseData = await response.json()
      exercises.value.push({
        id: firebaseData.name,
        exсTitle: title,
        exсType: type,
        exсLvl: lvl,
        excDuration: duration,
        excRepeat: repeat,
        excApproach: approach,
        excContent: content
      })
      loadExercises()
      filterType.value = ''
      addModal.value = false
    }

    async function removeExercise () {
      const id = currentIdOfTask.value
      await axios.delete(`https://vue-exercises-app-default-rtdb.firebaseio.com/exercises/${id}.json`)
      exercises.value = exercises.value.filter(exercise => exercise.id !== id)
    }

    async function editExercise (id, newTitle, newType, newLvl, newDuration, newRepeat, newApproach, newContent) {
      await axios.put(`https://vue-exercises-app-default-rtdb.firebaseio.com/exercises/${id}.json`, {
        exсTitle: newTitle,
        exсType: newType,
        exсLvl: newLvl,
        excDuration: newDuration,
        excRepeat: newRepeat,
        excApproach: newApproach,
        excContent: newContent
      })
      showModal.value = false
      loadExercises()
    }

    const countOfTask = computed(() => exercises.value.length)

    async function filterByType () {
      if (filterType.value === 'Все') {
        exercises.value = temp.value
      } else {
        exercises.value = temp.value.filter(exercise => exercise.exсType === filterType.value)
      }
    }

    async function filterByLvl () {
      if (filterLvl.value === 'Все') {
        exercises.value = temp.value
      } else {
        exercises.value = temp.value.filter(exercise => exercise.exсLvl === filterLvl.value)
      }
    }

    async function filterByName () {
      if (filterName.value === '') {
        await loadExercises()
      } else {
        exercises.value = temp.value.filter(exercise => exercise.exсTitle.toLowerCase().includes(filterName.value))
      }
    }

    function close () {
      addModal.value = false
      showModal.value = false
    }

    return {
      exercises, loadExercises, countOfTask, addModal, close, addNewExercise, filterType, filterByType, filterName, filterByName, filterLvl, filterByLvl, currentIdOfTask, removeExercise, showModal, editExercise, exc, addToMyExc
    }
  },
  mounted () {
    this.loadExercises()
  },
  components: { AddModal, showModal }

}
</script>

<style lang="scss" scoped>
.btn-div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filter{
  display: flex;
  flex-direction: row;
}

.filter__content{
  display: flex;
  flex-direction: column;
}

.filter__content select,
.filter__content input{
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  margin: 0;
  outline: none;
  border: 2px solid #ccc;
  display: block;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  font-size: 1rem;
  resize: none;
}

.filter__content input:active,
.filter__content input:focus {
  transition: border 0.22s;
  border: 2px solid #42b983;
}

</style>

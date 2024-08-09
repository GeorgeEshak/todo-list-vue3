<template>
  <div class="tasks ">
    <p class="font-bold text-2xl">ToDo List</p>
    <div
      :class="task.status === 'done' ? 'done-todo' : task.status === 'in progress' ? 'in-progress-todo' : ''"
      class="task card mb-4 relative"
      v-for="(task, index) in store.$state.tasks"
      :key="index"
      draggable="true"
      @dragstart="onDragStart(index)"
      @dragover.prevent
      @drop="onDrop(index)"
    >
      <img class="absolute" src="@/assets/drag-indicator.svg"/>
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p class="capitilize">{{ task.status }}</p>
      <button @click="deleteTask(task.id)">Remove</button>
      <button @click="showModel(task)">Update</button>
      <button @click="markTaskAsComplete(task.id)">Completed</button>
    </div>
    <TaskModel
      v-if="show"
      @show="show = $event"
      @add-task="addTask($event)"
      @update-task="updateTask($event)"
      :taskInfo="taskInfo"
    >
    </TaskModel>
    <button @click="showModel()">ADD</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import TaskModel from "../components/TaskModel.vue";
import { useAppStore } from "@/stores/index";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
}

const store = useAppStore();
const show: Ref<boolean> = ref(false);
const taskInfo: Ref<Task | null> = ref({
  id: 0,
  title: "",
  description: "",
  status: "todo",
});

const draggedIndex: Ref<number | null> = ref(null);

const showModel = (task?: Task): void => {
  show.value = true;
  task ? (taskInfo.value = { ...task }) : (taskInfo.value = null);
};

const addTask = (task: Task): void => {
  store.addTask(task);
  show.value = false;
};

const deleteTask = (id: number): void => {
  store.deleteTask(id);
  show.value = false;
};

const updateTask = (task: Task): void => {
  store.updateTask(task);
  show.value = false;
};

const markTaskAsComplete = (taskId: number): void => {
  store.markTaskAsComplete(taskId);
};

const onDragStart = (index: number): void => {
  draggedIndex.value = index;
};

const onDrop = (index: number): void => {
  if (draggedIndex.value !== null) {
    const draggedTask = store.$state.tasks[draggedIndex.value];
    store.$state.tasks.splice(draggedIndex.value, 1);
    store.$state.tasks.splice(index, 0, draggedTask);
    draggedIndex.value = null;
    localStorage.setItem('tasks', JSON.stringify(store.$state.tasks))
  }
};
onMounted(() => {
  store.getTasks()
})
</script>

<style>

</style>
<template>
  <div class="task-model card">
    <form>
      <div>
        <input placeholder="Task Title" class="w-full mb-4" type="text" name="title" v-model="task.title" />
      </div>
      <div>
        <textarea placeholder="Description" class="w-full mb-4" name="description" v-model="task.description"></textarea>
      </div>
      <div class="flex gap-4 task-status">
        <div class="input-field">
          <input
            type="radio"
            id="todo"
            name="status"
            value="todo"
            v-model="task.status"
          />
          <label for="todo">Todo</label>
        </div>
        <div class="input-field">
          <input
            type="radio"
            id="progress"
            name="status"
            value="in progress"
            v-model="task.status"
          />
          <label for="progress">In Progress</label>
        </div>
        <div class="input-field">
          <input
            type="radio"
            name="status"
            id="done"
            value="done"
            v-model="task.status"
          />
          <label for="done">Done</label>
        </div>
      </div>
      <button v-if="taskInfo" @click.prevent="updateTask">Update</button>
      <button v-else @click.prevent="addTask">Add</button>
      <button  @click.prevent="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
}
import { ref, defineEmits, defineProps } from "vue";
const emits = defineEmits(["add-task", "update-task", "show"]);
const props = defineProps(["taskInfo"]);
const task: Ref<Task> = ref({
  title: "",
  description: "",
  status: "",
});
task.value = { ...props.taskInfo };
const cancelEdit = (): void => {
  emits("show", false);
  task.value = {
    title: "",
    description: "",
    status: "",
  };
}
const addTask = (): void => {
  if (task.value.title && task.value.description && task.value.status) {
    emits("add-task", task.value);
    task.value = {
      title: "",
      description: "",
      status: "",
    };
  } else {
    alert("All fields are required!");
  }
};
const updateTask = (): void => {
  if (task.value.title && task.value.description && task.value.status) {
    emits("update-task", task.value);
    task.value = {
      title: "",
      description: "",
      status: "",
    };
  } else {
    alert("All fields are required!");
  }
};
</script>

<template>
  <div class="task-model card">
    <form>
      <div class="mb-4">
        <input placeholder="Task Title" class="w-full" type="text" name="title" v-model="task.title" @input="validate('title')"/>
        <p v-if="errors.title" class="text-small m-0 text-left text-danger">{{errors.title}}</p>
      </div>
      <div class="mb-4">
        <textarea placeholder="Description" class="w-full" name="description" v-model="task.description" @input="validate('description')"></textarea>
        <p v-if="errors.description" class="text-small m-0 text-left text-danger">{{errors.description}}</p>
      </div>
      <div class="flex gap-4 task-status">
        <div class="input-field">
          <input
            @change="validate('status')"
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
            @change="validate('status')"
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
            @change="validate('status')"
            type="radio"
            name="status"
            id="done"
            value="done"
            v-model="task.status"
          />
          <label for="done">Done</label>
        </div>
      </div>
      <p v-if="errors.status" class="text-small m-0 text-left text-danger">{{errors.status}}</p>
      <button v-if="taskInfo" @click.prevent="updateTask">Update</button>
      <button v-else @click.prevent="addTask">Add</button>
      <button  @click.prevent="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
interface Task {
  id?: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done" | "";
  validated?: boolean
}
import { log } from "console";
import { ref, type Ref } from "vue";
const emits = defineEmits(["add-task", "update-task", "show"]);
const props = defineProps(["taskInfo"]);
const task: Ref<Task> = ref({
  title: "",
  description: "",
  id: 0,
  status: 'todo',
  validated: false,
});
const errors = ref({
  title: '',
  description: '',
  status: ''
})

task.value = { ...props.taskInfo };
const cancelEdit = (): void => {
  emits("show", false);
  task.value = {
    title: "",
    description: "",
    status: "todo",
    validated: false,
  };
}
const validate = (key) => {
  switch (key) {
    case 'title':
      if (!task.value.hasOwnProperty('title') || task.value.title === '') {
        console.log(111)
        errors.value.title = 'This field is required'
      } else {
        errors.value.title = ''
      }
      break;
    case 'description':
      if (!task.value.hasOwnProperty('description') || task.value.description === '') {
        errors.value.description = 'This field is required'
      } else {
        errors.value.description = ''
      }
      break;
    case 'status':
      if (!task.value.hasOwnProperty('status') || task.value.status === '') {
        errors.value.status = 'This field is required'
      } else {
        errors.value.status = ''
      }
      break;
    default:
      break;
  }
}
const addTask = (): void => {
  for (const key in errors.value) {
    console.log(key)
    validate(key)
  }
  if (task.value.title && task.value.description && task.value.status) {
    emits("add-task", task.value);
    task.value = {
      title: "",
      description: "",
      status: "todo",
      validated: false,
    };
  }
};
const updateTask = (): void => {
  if (task.value.title && task.value.description && task.value.status) {
    emits("update-task", task.value);
    task.value = {
      title: "",
      description: "",
      status: "todo",
      validated: false,
    };
  }
};
</script>

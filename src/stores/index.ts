import { defineStore } from "pinia";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
}

export const useAppStore = defineStore("app", {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        status: "todo",
      },
    ] as Task[],
  }),
  actions: {
    getTasks () {
      this.tasks = JSON.parse(localStorage.getItem('tasks') as any)
    },
    addTask(task: Task) {
      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    deleteTask(taskId: number) {
      console.log(taskId);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    markTaskAsComplete(taskId: number) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = "done";
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
  },
});

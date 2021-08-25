import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data ={
      id: String(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    setTasks((myState) => [...myState, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const checked = updatedTasks.find((item) => item.id === id);
    
    if (!checked) {
      return;
    }
    checked.done = !checked.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const mySelectTasks = tasks.filter((item) => item.id !== id)
    setTasks(mySelectTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
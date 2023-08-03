import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, Button, Switch} from 'react-native';

import styles from './Style';
import {todo} from '../../helpers/GetApi';
import Title from '../../components/Title';
import {storage} from '../../Storage';

const localStorageKey = 'todos';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todo();
      let storedTasks = storage.getString(localStorageKey);
      let lsTasks = storedTasks ? JSON.parse(storedTasks) : [];

      let apiTasks = data.todos.map(task => {
        let storedTask = lsTasks.find(t => t.id === task.id);

        if (storedTask) {
          return storedTask;
        }
        return task;
      });
      const allTasks = [...lsTasks, ...apiTasks];

      let uniqueTasks = Array.from(new Set(allTasks.map(a => a.id))).map(id =>
        allTasks.find(a => a.id === id),
      );
      storage.set(localStorageKey, JSON.stringify(uniqueTasks));

      const completedTodos = storage.getString('completedTodos')
        ? JSON.parse(storage.getString('completedTodos'))
        : {};
      const updatedTasks = uniqueTasks.map(task => {
        return {
          ...task,
          completed: completedTodos[task.id],
        };
      });

      setTodos(updatedTasks);
      console.log(data.todos);
    } catch (error) {
      console.error('Error fetching Todos:', error);
    }
  };

  const handleTaskToggle = taskId => {
    setTodos(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = {...task, completed: !task.completed};

          const completedTodos = JSON.parse(
            storage.getString('completedTodos') || '{}',
          );
          completedTodos[taskId] = !completedTodos[taskId];

          storage.set('completedTodos', JSON.stringify(completedTodos));

          return updatedTask;
        }
        return task;
      }),
    );
  };

  const addNewTask = () => {
    if (newTodo.trim() !== '') {
      const newTask = {
        id: Date.now().toString(),
        todo: newTodo,
        completed: false,
      };

      setTodos(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        storage.set(localStorageKey, JSON.stringify(updatedTasks));
        return updatedTasks;
      });

      setNewTodo('');
    }
  };
  useEffect(() => {
    // Retrieve task's completion status from localStorage
    const updatedTasks = todos.map(task => {
      const storedTask = storage.getString(task.id);
      if (storedTask) {
        const parsedTask = JSON.parse(storedTask);
        return {
          ...task,
          completed: parsedTask.completed,
        };
      }
      return task;
    });
    setTodos(updatedTasks);
  }, []);

  return (
    <View style={styles.container}>
      <Title title="What To Do Today" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
        />
    
      </View>
      <View style={{margin:20,width:200, justifyContent:"center"}}>
      
      <Button style={styles.button} title="Add" onPress={addNewTask} color="teal" />
      </View>

      <FlatList
        data={todos}
        renderItem={({item, index}) => (
          <View style={styles.list}>
            <Text style={styles.text}>{item.todo}</Text>
           
            <Switch
            style={{marginBottom:10}}

              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={item.completed ? 'lightblue' : 'gray'}
              value={item.completed}
              onValueChange={() => handleTaskToggle(item.id)}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />

    
    
    </View>
  );
}

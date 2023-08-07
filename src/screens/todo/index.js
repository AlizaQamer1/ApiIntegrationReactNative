
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Switch } from 'react-native';
import axios from 'axios';
import Title from '../../components/Title';
import { storage } from '../../Storage';
import { todo } from '../../helpers/GetApi';
import styles from './Style';

const BASE_URL = 'https://dummyjson.com';

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
  
    useEffect(() => {
      fetchAndCombineTodos();
    }, []);
  
    const fetchAndCombineTodos = async () => {
      try {
        const id = await storage.getString('id');
        if (!id) {
          setTodos([]);
          return;
        }
    
        const storedTodos = storage.getString(`todos_${id}`);
        const storedTodosArray = storedTodos ? JSON.parse(storedTodos) : [];
    
        const apiData = await todo();
        const apiTodos = apiData.todos;
    
        const combinedTodosMap = new Map();
    
        storedTodosArray.forEach((todo) => combinedTodosMap.set(todo.id, todo));
    
        // Initialize the completed state of each API todo using stored value or false if not found
        apiTodos.forEach((todo) => {
          const storedTodo = combinedTodosMap.get(todo.id);
          const completed = storedTodo ? storedTodo.completed : false;
          combinedTodosMap.set(todo.id, { ...todo, completed });
        });
    
        const combinedTodos = Array.from(combinedTodosMap.values());
    
        setTodos(combinedTodos);
      } catch (error) {
        console.error('Error fetching and combining Todos:', error);
      }
    };
    
    const toggleTodoCompleted = async (id) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          // Update storage with the new completed state
          updateTodoInStorage(updatedTodo);
          return updatedTodo;
        }
        return todo;
      });
    
      setTodos(updatedTodos);
    };
    
    const updateTodoInStorage = async (updatedTodo) => {
      try {
        const userId = await storage.getString('id');
        const storedTodos = storage.getString(`todos_${userId}`);
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos);
          const updatedTodos = parsedTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          );
          storage.set(`todos_${userId}`, JSON.stringify(updatedTodos));
        }
      } catch (error) {
        console.error('Error updating todo in storage:', error);
      }
    };

  
  

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now().toString(),
        todo: newTodo,
        completed: false, // Initialize completed state as false
      };
  
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
  
      const userId = await storage.getString('id');
      const storedTodos = storage.getString(`todos_${userId}`);
      const updatedTodos = storedTodos ? [...JSON.parse(storedTodos), newTodoItem] : [newTodoItem];
      storage.set(`todos_${userId}`, JSON.stringify(updatedTodos));
  
      setNewTodo('');
    }
  };
  

  return (
    <View style={styles.container}>
      <Title title="What To Do Today" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new todo"
          value={newTodo}
          onChangeText={setNewTodo}
        />
      </View>
      <View style={styles.button}>
        <Button title="Add Todo" onPress={handleAddTodo} color="teal" />
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>{item.todo}</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={item.completed ? 'lightblue' : 'gray'}
              value={item.completed}
              onValueChange={() => toggleTodoCompleted(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

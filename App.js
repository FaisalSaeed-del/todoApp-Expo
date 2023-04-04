import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const addTodo = () => {
    const newTodo = {
      id: Math.random().toString(),
      text,
      completed: false,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setText(todo.text);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedTodo(null);
    setText('');
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => completeTodo(item.id)}>
      <View style={[styles.item, item.completed && styles.completed]}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEditModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeEditModal}
    >
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Edit todo"
          returnKeyType="done"
          clearButtonMode="always"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={closeEditModal}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            editTodo(selectedTodo.id, text);
            closeEditModal();
          }}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO App</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
       <TextInput
        style={styles.input}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={addTodo}
        value={text}
        placeholder="Add a todo"
        returnKeyType="done"
        clearButtonMode="always"
      />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        {renderEditModal()}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    list: {
      width: '100%',
      marginBottom: 20,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    completed: {
      backgroundColor: '#cccccc',
    },
    itemText: {
      fontSize: 18,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    editButton: {
      color: '#007aff',
      marginRight: 10,
    },
    deleteButton: {
      color: '#ff3b30',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    addButton: {
      backgroundColor: '#007aff',
      borderRadius: 50,
      height: 50,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    cancelButton: {
      color: '#007aff',
      marginRight: 10,
    },
    saveButton: {
      color: '#007aff',
    },
  });
  
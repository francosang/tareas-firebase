/**
 * Todo Repository
 * Handles all Firestore operations for the todos collection
 * Provides a clean abstraction layer between UI and Firebase
 */

import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const COLLECTION_NAME = 'tareas';

/**
 * Creates a Firestore query for todos filtered by user ID
 * @param {string} userId - The user's unique identifier
 * @returns {Query} Firestore query object
 */
export const getTodosQuery = (userId) => {
  return query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId)
  );
};

/**
 * Adds a new todo to the collection
 * @param {Object} todoData - The todo data to add
 * @param {string} todoData.title - Todo title
 * @param {string} todoData.userId - User ID who owns the todo
 * @returns {Promise<DocumentReference>} Reference to the created document
 */
export const addTodo = async ({ title, userId }) => {
  if (!title || !title.trim()) {
    throw new Error('Todo title is required');
  }
  
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await addDoc(collection(db, COLLECTION_NAME), {
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    userId
  });
};

/**
 * Toggles the completed status of a todo
 * @param {string} todoId - The ID of the todo to toggle
 * @param {boolean} currentStatus - Current completed status
 * @returns {Promise<void>}
 */
export const toggleTodoComplete = async (todoId, currentStatus) => {
  if (!todoId) {
    throw new Error('Todo ID is required');
  }

  const todoRef = doc(db, COLLECTION_NAME, todoId);
  await updateDoc(todoRef, {
    completed: !currentStatus
  });
};

/**
 * Updates a todo's data
 * @param {string} todoId - The ID of the todo to update
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<void>}
 */
export const updateTodo = async (todoId, updates) => {
  if (!todoId) {
    throw new Error('Todo ID is required');
  }

  const todoRef = doc(db, COLLECTION_NAME, todoId);
  await updateDoc(todoRef, updates);
};

/**
 * Deletes a todo from the collection
 * @param {string} todoId - The ID of the todo to delete
 * @returns {Promise<void>}
 */
export const deleteTodo = async (todoId) => {
  if (!todoId) {
    throw new Error('Todo ID is required');
  }

  const todoRef = doc(db, COLLECTION_NAME, todoId);
  await deleteDoc(todoRef);
};

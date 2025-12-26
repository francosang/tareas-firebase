/**
 * Data Layer Entry Point
 * Exports all data access functions and services
 * This provides a clean API for the UI layer
 */

// Firebase configuration
export { firebaseApp, db, auth } from './firebaseConfig';

// Todo repository functions
export {
  getTodosQuery,
  addTodo,
  toggleTodoComplete,
  updateTodo,
  deleteTodo
} from './repositories/TodoRepository';

// Authentication service functions
export {
  signInWithGoogle,
  signOut,
  onAuthChange,
  getCurrentUser
} from './services/AuthService';

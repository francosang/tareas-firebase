<script setup>
import { ref, computed } from "vue";
import { useCollection } from "vuefire";
import { 
  getTodosQuery,
  addTodo as addTodoToDb,
  toggleTodoComplete as toggleTodoInDb,
  deleteTodo as deleteTodoFromDb
} from "@/data";

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

// Get todos query for the current user
const todosQuery = getTodosQuery(props.user.uid);
const { data: todos, pending: loading } = useCollection(todosQuery);

const newTodoTitle = ref("");
const filterType = ref("all"); // all, active, completed

const filteredTodos = computed(() => {
  if (!todos.value) return [];
  
  let filtered = [];
  if (filterType.value === "active") {
    filtered = todos.value.filter(todo => !todo.completed);
  } else if (filterType.value === "completed") {
    filtered = todos.value.filter(todo => todo.completed);
  } else {
    filtered = [...todos.value];
  }
  
  // Ordenar por fecha de creación (más antiguos primero)
  return filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateA - dateB;
  });
});

const stats = computed(() => {
  if (!todos.value) return { total: 0, active: 0, completed: 0 };
  
  return {
    total: todos.value.length,
    active: todos.value.filter(t => !t.completed).length,
    completed: todos.value.filter(t => t.completed).length
  };
});

const addTodo = async () => {
  if (newTodoTitle.value.trim()) {
    try {
      await addTodoToDb({
        title: newTodoTitle.value,
        userId: props.user.uid
      });
      newTodoTitle.value = "";
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
};

const toggleTodo = async (todo) => {
  try {
    await toggleTodoInDb(todo.id, todo.completed);
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await deleteTodoFromDb(todoId);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
};
</script>

<template>
  <div class="todos-wrapper">
    <!-- Stats Section -->
    <div class="stats-card">
      <!-- Loading State for Stats -->
      <template v-if="loading">
        <div class="stat stat-loading">
          <div class="stat-skeleton"></div>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat stat-loading">
          <div class="stat-skeleton"></div>
          <span class="stat-label">Activas</span>
        </div>
        <div class="stat stat-loading">
          <div class="stat-skeleton"></div>
          <span class="stat-label">Completadas</span>
        </div>
      </template>
      
      <!-- Stats Data -->
      <template v-else>
        <div class="stat">
          <span class="stat-value">{{ stats.total }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ stats.active }}</span>
          <span class="stat-label">Activas</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ stats.completed }}</span>
          <span class="stat-label">Completadas</span>
        </div>
      </template>
    </div>

    <!-- Add Todo Section -->
    <div class="add-todo-card">
      <div class="input-group">
        <input
          v-model="newTodoTitle"
          @keypress="handleKeyPress"
          type="text"
          placeholder="¿Qué necesitas hacer?"
          class="todo-input"
        />
        <button @click="addTodo" class="add-btn" :disabled="!newTodoTitle.trim()">
          <span class="btn-icon">+</span>
          Agregar
        </button>
      </div>
    </div>

    <!-- Filter Tabs -->
    <!-- <div class="filter-tabs">
      <button
        @click="filterType = 'all'"
        :class="['filter-tab', { active: filterType === 'all' }]"
      >
        Todas
      </button>
      <button
        @click="filterType = 'active'"
        :class="['filter-tab', { active: filterType === 'active' }]"
      >
        Activas
      </button>
      <button
        @click="filterType = 'completed'"
        :class="['filter-tab', { active: filterType === 'completed' }]"
      >
        Completadas
      </button>
    </div> -->

    <!-- Todos List -->
    <div class="todos-container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Cargando tus tareas...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredTodos || filteredTodos.length === 0" class="empty-state">
        <div class="empty-icon">{{ filterType === 'completed' ? '🎉' : '📋' }}</div>
        <p class="empty-text">
          {{ filterType === 'completed' ? '¡Aún no hay tareas completadas!' : '¡No hay tareas! Agrega una arriba.' }}
        </p>
      </div>

      <ul v-else class="todos-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="['todo-item', { completed: todo.completed }]"
        >
          <div class="todo-content">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo)"
              class="todo-checkbox"
            />
            <span class="todo-title">{{ todo.title }}</span>
          </div>
          <button @click="deleteTodo(todo.id)" class="delete-btn" title="Eliminar tarea">
            <span>🗑️</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.todos-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* Stats Card */
.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.stat:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Stats Loading State */
.stat-loading {
  pointer-events: none;
}

.stat-skeleton {
  width: 80px;
  height: 3rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  margin: 0 auto 0.5rem;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Add Todo Card */
.add-todo-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.todo-input {
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-tab {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  background: #f5f5f5;
  color: #333;
}

.filter-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

/* Todos Container */
.todos-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.todos-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  background: white;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background: #f9f9f9;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #667eea;
}

.todo-title {
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 6px;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: #ffe0e0;
  transform: scale(1.1);
}

.delete-btn:active {
  transform: scale(0.95);
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  color: #999;
  font-size: 1.1rem;
}

/* Loading State */
.loading-state {
  padding: 4rem 2rem;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #999;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-card {
    gap: 0.75rem;
  }

  .stat {
    padding: 1rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .add-todo-card {
    padding: 1.5rem;
  }

  .input-group {
    flex-direction: column;
  }

  .add-btn {
    justify-content: center;
  }

  .filter-tabs {
    gap: 0.25rem;
  }

  .filter-tab {
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
  }

  .todo-item {
    padding: 1rem;
  }

  .delete-btn {
    opacity: 1;
  }
}
</style>


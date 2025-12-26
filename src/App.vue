<script setup>
import { ref, onMounted } from 'vue';
import { onAuthChange, signOut } from '@/data';
import TodosList from './components/TodosList.vue';
import Login from './components/Login.vue';

const user = ref(null);
const loading = ref(true);

onMounted(() => {
  onAuthChange((currentUser) => {
    user.value = currentUser;
    loading.value = false;
  });
});

const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<template>
  <div class="app-container">
    <header>
      <div class="header-content">
        <div class="header-top">
          <div class="logo-section">
            <span class="logo-icon">📝</span>
            <div class="title-section">
              <h1 class="app-title">Tareas Firebase</h1>
              <p class="subtitle">Aplicación moderna con Vue 3 y Firebase</p>
            </div>
          </div>
          
          <div v-if="user" class="user-section">
            <div class="user-info">
              <img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName" class="user-avatar" />
              <span class="user-name">{{ user.displayName }}</span>
            </div>
            <button @click="handleSignOut" class="logout-btn">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
      <Login v-else-if="!user" />
      <TodosList v-else :user="user" />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 2.5rem 1rem;
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.title-section {
  text-align: left;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

main {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.user-name {
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
  transform: translateY(-2px);
}

.loading-container {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: white;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  header {
    padding: 1.5rem 1rem;
  }

  .header-top {
    flex-direction: column;
    gap: 1.5rem;
  }

  .logo-section {
    gap: 1rem;
  }

  .logo-icon {
    font-size: 2.5rem;
  }

  .app-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .user-section {
    flex-direction: column;
    gap: 1rem;
  }

  .user-name {
    display: none;
  }
  
  main {
    padding: 1rem;
  }
}
</style>

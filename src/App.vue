<script setup>
import TodosList from './components/TodosList.vue';
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
        </div>
      </div>
    </header>

    <main>
      <TodosList />
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
  justify-content: center;
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

footer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
}

.heart {
  color: #e74c3c;
  animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }
  
  .icon {
    font-size: 2rem;
  }
  
  main {
    padding: 1rem;
  }
}
</style>

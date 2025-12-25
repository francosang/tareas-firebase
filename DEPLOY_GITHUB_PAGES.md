# Despliegue a GitHub Pages

## Configuración necesaria

### 1. Actualizar vite.config.js
✅ Ya configurado con base: '/tareas-firebase/'

### 2. Instalar gh-pages
```bash
npm install -D gh-pages
```

### 3. En Firebase Console - IMPORTANTE

**Agregar dominio autorizado:**
1. Ve a Firebase Console → Authentication → Settings → Authorized domains
2. Agrega: `francosang.github.io`
3. Guarda los cambios

**Actualizar reglas de Firestore:**
1. Ve a Firestore Database → Rules
2. Reemplaza con:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### 4. Construir y desplegar

**Primera vez:**
```bash
npm install
npm run deploy
```

**Actualizaciones posteriores:**
```bash
npm run deploy
```

### 5. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: selecciona la rama `gh-pages`
4. Save

### 6. Acceder a tu app

Tu app estará en: `https://francosang.github.io/tareas-firebase/`

## Solución de problemas

**Error de autenticación:**
- Verifica que agregaste el dominio en Firebase Console
- Espera unos minutos después de agregar el dominio

**Página en blanco:**
- El base en vite.config.js ya está configurado correctamente: '/tareas-firebase/'
- Ejecuta `npm run deploy` nuevamente

**Error 404:**
- Asegúrate de que GitHub Pages esté configurado para usar la rama `gh-pages`
- Espera unos minutos después del deploy

## Comandos útiles

```bash
# Desarrollo local
npm run dev

# Vista previa del build de producción
npm run build && npm run preview

# Desplegar a GitHub Pages
npm run deploy
```

# Configuración de Autenticación con Google en Firebase

## ⚡ Probar en modo desarrollo (localhost)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Firebase en `src/main.js`
Reemplaza los valores de placeholder con tu configuración real de Firebase.

### 3. Habilitar Google Authentication en Firebase Console (ver abajo)

### 4. Verificar que localhost esté autorizado
Firebase Console → Authentication → Settings → Authorized domains
- `localhost` debería estar ahí por defecto
- Si no, agrégalo manualmente

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

¡Listo! La app abrirá en `http://localhost:5173` y podrás hacer login con Google.

---

## Pasos a seguir en Firebase Console:

### 1. Habilitar Google Authentication

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. En el menú lateral, ve a **Build** → **Authentication**
4. Haz clic en **Get Started** (si es la primera vez)
5. Ve a la pestaña **Sign-in method**
6. Haz clic en **Google** en la lista de proveedores
7. Activa el interruptor **Enable**
8. Selecciona un email de soporte para el proyecto
9. Haz clic en **Save**

### 2. Configurar dominios autorizados

**Para desarrollo local:**
- `localhost` ya está autorizado por defecto ✅

**Para GitHub Pages (cuando despliegues):**
1. En la misma sección de **Authentication**
2. Ve a la pestaña **Settings**
3. Baja hasta **Authorized domains**
4. Agrega tu dominio de GitHub Pages: `tu-usuario.github.io`
5. También puedes agregar dominios personalizados si los tienes

### 3. Reglas de Firestore

Para que solo los usuarios autenticados puedan ver sus propias tareas, actualiza las reglas de Firestore:

1. Ve a **Firestore Database** → **Rules**
2. Reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      // Solo usuarios autenticados
      allow read, write: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
      
      // Permitir crear si el userId coincide
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Haz clic en **Publish**

## Características implementadas:

✅ Login con cuenta de Google
✅ Pantalla de bienvenida cuando no hay sesión
✅ Avatar y nombre del usuario en el header
✅ Botón de cerrar sesión
✅ Cada usuario solo ve sus propias tareas
✅ Las tareas se vinculan automáticamente al userId
✅ Responsive en móvil

## Despliegue en GitHub Pages

Recuerda que necesitarás configurar el build para GitHub Pages. Crea un archivo `vite.config.js` con:

```javascript
export default {
  base: '/nombre-de-tu-repo/'
}
```

Y en package.json agrega los scripts:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Instala gh-pages:
```bash
npm install -D gh-pages
```

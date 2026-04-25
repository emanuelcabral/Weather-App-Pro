# 🌤️ Weather App Pro

Aplicación web interactiva del clima desarrollada con **jQuery**, que consume una API en tiempo real para mostrar información meteorológica, pronóstico extendido, ubicación automática, sistema de favoritos y animaciones dinámicas según el clima y la estación del año (hemisferio sur).

---

# 📌 Descripción del proyecto

**Weather App Pro** es un proyecto frontend diseñado como una aplicación real de clima. Su objetivo es demostrar habilidades en consumo de APIs, manipulación del DOM, manejo de estados en el navegador y creación de interfaces dinámicas e interactivas.

Incluye:

- Consulta de clima en tiempo real
- Geolocalización automática del usuario
- Pronóstico extendido de 3 días
- Sistema de ciudades favoritas
- Animaciones visuales según estación del año
- Interfaz dinámica basada en el clima actual

---

# ⚙️ Tecnologías utilizadas

- HTML5
- CSS3 (diseño responsivo + animaciones)
- JavaScript (ES6)
- jQuery 3.6
- WeatherAPI (API externa de clima)
- LocalStorage (persistencia de datos)
- Geolocation API (ubicación del usuario)

---

# 🌍 Consumo de API del clima

Este proyecto utiliza la API de **WeatherAPI**:

👉 https://www.weatherapi.com/

## Endpoints utilizados:

### 🌡️ Clima actual

/v1/current.json

### 📊 Pronóstico extendido (3 días)

/v1/forecast.json


## Datos obtenidos desde la API:

- Temperatura actual (°C)
- Condición del clima (texto e ícono)
- Ubicación (ciudad y país)
- Pronóstico de varios días
- Iconos oficiales del clima

---

# 🧠 Funcionalidades principales

## 🌤️ Clima en tiempo real
- Búsqueda de cualquier ciudad del mundo
- Actualización inmediata de datos
- Detección automática por ubicación del usuario

## 📊 Pronóstico extendido
- Pronóstico de 3 días
- Temperatura promedio diaria
- Condiciones meteorológicas con íconos

## ⭐ Sistema de favoritos
- Guardado de ciudades en LocalStorage
- Persistencia de datos en el navegador
- Acceso rápido con un clic

## 🎨 Interfaz dinámica
- Cambio de fondo según el clima
- Emojis dinámicos según condición meteorológica
- Iconos oficiales de la API
- Estados de carga y error

---

# 🌍 Sistema de estaciones (Hemisferio Sur)

El proyecto incluye un sistema visual basado en estaciones del año según el hemisferio sur:

| Estación | Meses | Animación |
|----------|------|-----------|
| ☀️ Verano | Dic - Feb | Partículas de sol |
| 🍂 Otoño | Mar - May | Hojas cayendo |
| ❄️ Invierno | Jun - Ago | Nieve animada |
| 🌸 Primavera | Sep - Nov | Flores flotantes |

---

# 🧩 Uso de jQuery

Este proyecto utiliza **jQuery** para:

## Manipulación del DOM
- Actualización dinámica de elementos
- Inserción de contenido HTML
- Control de clases CSS

## Peticiones AJAX
- Consumo de API del clima
- Manejo de respuestas asíncronas

## Eventos
- Click en botones
- Búsqueda con ENTER
- Eventos dinámicos en favoritos

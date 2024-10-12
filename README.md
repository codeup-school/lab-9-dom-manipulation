# Lab: Llamada a API de cervecerías y manipulación del DOM

## Objetivo

Crear una página web que, al pulsar un botón, realice una llamada a la API de Open Brewery DB y muestre una lista de las cervecerías obtenidas utilizando manipulación del DOM.

## Instrucciones

1. Crea un archivo HTML con un botón y un contenedor para la lista de cervecerías.
2. Crea un archivo JavaScript y vincula con el HTML.
3. Implementa las siguientes funcionalidades en JavaScript:
   - Añade un event listener al botón para manejar el clic.
   - Al hacer clic, realiza una llamada a la API `https://api.openbrewerydb.org/v1/breweries` utilizando `fetch`.
   - Procesa la respuesta de la API y crea elementos de lista para cada cervecería.
   - Añade los elementos creados al contenedor en el DOM.

## Retos adicionales

- Añade más información de cada cervecería (por ejemplo, ciudad, estado, sitio web).
- Implementa un sistema de paginación para mostrar 10 cervecerías por página.
- Añade un campo de búsqueda para filtrar las cervecerías por nombre.

## Posible solución

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lista de Cervecerías</title>
  </head>
  <body>
    <h1>Lista de Cervecerías</h1>
    <button id="cargarCervecerias">Cargar Cervecerías</button>
    <ul id="listaCervecerias"></ul>
    <script src="script.js"></script>
  </body>
</html>
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("cargarCervecerias");
  const lista = document.getElementById("listaCervecerias");

  boton.addEventListener("click", async () => {
    try {
      const respuesta = await fetch(
        "https://api.openbrewerydb.org/v1/breweries"
      );
      const cervecerias = await respuesta.json();

      lista.innerHTML = ""; // Limpiar la lista antes de añadir nuevos elementos

      cervecerias.forEach((cerveceria) => {
        const li = document.createElement("li");
        li.textContent = cerveceria.name;
        lista.appendChild(li);
      });
    } catch (error) {
      console.error("Error al cargar las cervecerías:", error);
    }
  });
});
```

Esta solución proporciona una implementación básica del lab. Los estudiantes pueden expandirla para incluir más detalles o funcionalidades adicionales según los retos propuestos.

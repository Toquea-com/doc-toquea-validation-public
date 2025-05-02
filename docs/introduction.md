---
title: Introducción
---

<script setup lang="ts">
import VueMermaidString from 'vue-mermaid-string'

const mmd = `
sequenceDiagram
    participant Integrador as Integrador
    participant Toquea as Toquea
    participant Usuario as Usuario

    Integrador->>Toquea: Llama a generate-url con token de autorización
    Toquea-->>Integrador: Devuelve JSON con url e id
    Integrador->>Usuario: Redirige o carga url en iframe
    Usuario->>Toquea: Realiza validación de documentos
    Toquea-->>Integrador: Notifica resultado de validación (por webhook)
    Toquea-->>Integrador: Redirige usuario (si es necesario)
    Integrador->>Usuario: Sigue el proceso
`
</script>

# Descripción del Flujo

El flujo de validación de documentos comienza cuando se invoca el servicio generate-url, proporcionando el token de autorización entregado por Toquea. Este servicio responde con un objeto JSON que incluye dos campos importantes: la url y el id. La URL proporcionada es la que se utiliza para redirigir al usuario a la página de validación. Esta página puede ser integrada como un iframe dentro de otras plataformas o ser abierta directamente en el navegador del usuario. Una vez en la página, el usuario procede a realizar la validación de documentos. Al finalizar el proceso, el sistema responde redirigiendo al usuario a la URL previamente indicada o notificando a un webhook que fue configurado con antelación. Si la validación es exitosa, el sistema envía los datos correspondientes al webhook para su posterior procesamiento.
<br>
<br>
<VueMermaidString :value="mmd" />
<br>
<br>
<!--OAInfo /-->


# Webhook: Resultado de Validación de Identidad (`idValidationResult`)

Este webhook es llamado por el sistema cuando se completa un proceso de validación de identidad. Notifica al integrador el resultado final del proceso, junto con información relevante (como fotos y estado).

## 🔔 URL del Webhook

La URL del webhook debe ser provista por el integrador al equipo de integración para ser registrada y utilizada por el sistema.

## 📥 Request (Payload enviado)

El cuerpo del webhook será un objeto `JSON` con los siguientes campos:

| Campo         | Tipo     | Requerido | Descripción |
|---------------|----------|-----------|-------------|
| `idNumber`    | `string` | ✅ Sí      | Número del documento de identidad del usuario. |
| `idType`      | `string` | ✅ Sí      | Tipo de documento (actualmente solo `dni`). |
| `state`       | `string` | ✅ Sí      | Estado final de la validación. Puede ser `APPROVED`, `REJECTED`, `PENDING` |
| `urlSelfie`   | `string` (URL) | ❌ No | URL de la selfie del usuario capturada durante la validación. |
| `urlDocFront` | `string` (URL) | ❌ No | URL de la foto frontal del documento del usuario. |
| `urlDocBack`  | `string` (URL) | ❌ No | URL de la foto posterior del documento del usuario. |

### 📌 Notas
- Los campos `urlSelfie`, `urlDocFront`, y `urlDocBack` **pueden no estar presentes** en todos los casos.
- El campo `state` puede tener sufijos que indiquen la razón de rechazo o aprobación. Se recomienda hacer validación con prefijos (`startsWith('REJECTED')`, por ejemplo).

### 🧪 Ejemplo de request

```json
{
  "idNumber": "12345678",
  "idType": "dni",
  "state": "REJECTED_BY_PARTNER",
  "urlSelfie": "https://cdn.ejemplo.com/selfies/usuario123.jpg",
  "urlDocFront": "https://cdn.ejemplo.com/docs/front/usuario123.jpg",
  "urlDocBack": "https://cdn.ejemplo.com/docs/back/usuario123.jpg"
}
```

## 📤 Respuesta esperada

El sistema espera un JSON de confirmación con el campo `idNumber` recibido:

### 🧪 Ejemplo de respuesta

```
{
  "idNumber": "12345678"
}
```

## 🔐 Seguridad

Este webhook **debe estar protegido mediante un token de autorización** para garantizar que los eventos provienen de una fuente confiable.

El sistema enviará el siguiente encabezado HTTP en cada solicitud al webhook:

```
Authorization: Bearer <token>
```


- El token debe ser **proporcionado por el integrador** y entregado previamente al equipo técnico para su configuración.
- Se recomienda que el integrador valide este token en cada llamada entrante al webhook.
- Este mecanismo permite rechazar cualquier intento de suplantación o llamadas no autorizadas.

> ⚠️ Si el token es incorrecto o está ausente, el webhook **debe responder con código `401 Unauthorized`**.

# Formularios e interaccion

Este documento resume los formularios implementados en el frontend y como se manejan.

## 1. Formulario principal

El formulario principal de la app es:

- `frontend/src/components/transactions/TransactionForm.tsx`

Se usa para crear nuevos movimientos de tipo ingreso o gasto.

## 2. Formulario controlado

El formulario esta hecho como formulario controlado en React.

Eso significa que cada input guarda su valor en estado con `useState`.

Campos controlados:

- `type`
- `amountMinor`
- `categoryId`
- `date`
- `note`

Cada cambio en los inputs actualiza el estado del componente.

## 3. Gestion del estado

Dentro de `TransactionForm` se manejan estados locales para:

- los valores del formulario;
- el mensaje de error.

Esto permite validar antes de enviar y mantener la interfaz sincronizada con lo que escribe el usuario.

## 4. Validaciones basicas

Se implementaron validaciones simples antes de ejecutar `onSubmit`.

Validaciones actuales:

- la categoria debe estar seleccionada;
- el monto debe ser un entero positivo;
- la fecha debe existir.

Si alguna validacion falla, el formulario muestra un mensaje de error y no envia los datos.

## 5. Mensajes de error

El formulario muestra errores dentro de una caja visual en rojo.

Ejemplos:

- `Elegi una categoria.`
- `El monto debe ser un entero positivo (en centimos).`
- `Elegi una fecha.`

Esto ayuda a que la correccion sea clara e inmediata.

## 6. Mensajes de confirmacion

La pagina de movimientos:

- `frontend/src/pages/TransactionsPage.tsx`

muestra mensajes de confirmacion despues de ciertas acciones.

Acciones con feedback:

- al crear un movimiento:
  `Movimiento guardado correctamente.`
- al eliminar un movimiento:
  `Movimiento eliminado correctamente.`

Estos mensajes aparecen en una caja verde y desaparecen automaticamente despues de unos segundos.

## 7. Interaccion con el usuario

El formulario se abre dentro de un modal desde la pagina de movimientos.

El flujo es este:

1. el usuario pulsa `Nuevo movimiento`;
2. se abre el modal;
3. completa los campos;
4. si hay errores, se muestran en el formulario;
5. si todo esta bien, se guarda el movimiento;
6. se muestra un mensaje de confirmacion.

## 8. Resumen

La app ya tiene una implementacion suficiente para esta fase:

- formulario controlado con React;
- estado manejado con hooks;
- validacion basica;
- mensajes de error;
- mensajes de confirmacion;
- documentacion del flujo.

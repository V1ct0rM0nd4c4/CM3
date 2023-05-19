$(document).ready(function () {
    let presupuesto = 0;
    let gastos = [];
    let saldo = 0;

    //funcionalidad de botón de agregar presupuesto
    $("#agregarPresupuesto").click(() => {
        presupuesto = parseInt($("#presupuestoIngresado").val());
        actualizarPresupuesto(presupuesto);
        limpiarCamposPresupuesto();
    });

    //funcionalidad del botón agregarGasto
    $("#agregarGasto").click(() => {
        const nombreGasto = $("#nombreGasto").val();
        const cantidadGasto = parseInt($("#cantidadGasto").val());
        if (validarGasto(nombreGasto, cantidadGasto)) {
            agregarGasto(nombreGasto, cantidadGasto);
            calcularSaldo();
            limpiarCamposGasto();
            dibujarGastos();
        }
    });

    //funcionalidad que agrega el gasto a la tabla
    function dibujarGastos() {
        $("#tablaGastos").html("");
        gastos.forEach((gasto, index) => {
            $("#tablaGastos").append(
                `<tr>
                <td>${gasto.nombre}</td>
                <td>$${gasto.cantidad.toLocaleString("es-CL")}</td>
                <td> 
                    <i class="fa-solid fa-trash-alt btn btn-primary" data-index="${index}"></i>
                </td>
                </tr>`
            );
        });
    }

    // funcionalidad del botón de eliminar el gasto seleccionado
    $("#tablaGastos").on("click", ".fa-trash-alt", function () {
        const index = $(this).attr("data-index");
        eliminarGasto(index);
        calcularSaldo();
        dibujarGastos();
    });

    // Actualiza el presupuesto mostrado en la interfaz
    function actualizarPresupuesto(valor) {
        $("#mostrarPresupuesto").attr("data-value", valor);
        $("#mostrarPresupuesto").html("$" + valor.toLocaleString("es-CL"));
    }

    // Limpia los campos de ingreso de presupuesto
    function limpiarCamposPresupuesto() {
        $("#presupuestoIngresado").val("");
    }

    // Valida los datos de un gasto ingresado por el usuario
    function validarGasto(nombre, cantidad) {
        if (nombre.trim() === "" || isNaN(cantidad) || cantidad <= 0) {
            alert("Ingrese un nombre y una cantidad válida para el gasto.");
            return false;
        }
        return true;
    }

    // Agrega un gasto a la lista de gastos
    function agregarGasto(nombre, cantidad) {
        gastos.push({ nombre: nombre, cantidad: cantidad });
    }

    // Elimina un gasto de la lista de gastos
    function eliminarGasto(index) {
        gastos.splice(index, 1);
    }

    // Calcula el saldo disponible restando los gastos al presupuesto
    function calcularSaldo() {
        let totalGastos = 0;
        gastos.forEach((gasto) => {
            totalGastos += gasto.cantidad;
        });
        saldo = presupuesto - totalGastos;
        $("#totalGastos").html("$" + totalGastos.toLocaleString("es-CL"));
        $("#saldoDisponible").html("$" + saldo.toLocaleString("es-CL"));
    }

    // Limpia los campos de ingreso de un nuevo gasto
    function limpiarCamposGasto() {
        $("#nombreGasto").val("");
        $("#cantidadGasto").val("");
    }
});
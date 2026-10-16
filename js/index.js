document.addEventListener("DOMContentLoaded", () => {
    const tarjetaForm = document.getElementById("tarjetaForm")
    const selectHorario = document.getElementById("selectHorario")
    const msgInfoTurno = document.getElementById("msgInfoTurno")
    const opcionesTurno = document.querySelectorAll("input[name='turno']") 

    const inputTelefono = document.getElementById("txtTelefono")
    const errorTelefono = document.getElementById("errorTelefono")
    const areaBio = document.getElementById("txtBio")
    const numContador = document.getElementById("numContador")
    const chkAceptar = document.getElementById("chkAceptar")
    const btnEnviar = document.getElementById("btnEnviar")
    const boxExito = document.getElementById("boxExito")
    const formRegistro = document.getElementById("formRegistro")
    const datosTurno = {
        manana: {
            claseTema: "tema-manana",
            horarios: ["08:00 AM - 10:00 AM", "10:15 AM - 12:15 PM"],
            info: "Turno mañana: incluye acceso libre a la biblioteca"
        },
        tarde: {
            claseTema: "tema-tarde",
            horarios: ["02:00 PM - 04:00 PM", "04:15 PM - 06:15 PM"],
            info: "Turno tarde: recomendado para gente que trabajar part time"
        },
        noche: {
            claseTema: "tema-noche",
            horarios: ["07:00 PM - 09:00 PM", "09:15 PM - 11:15 PM"],
            info: "Turno noche: recomendado para gente que trabaja full time"
        }

    }
    function actualizarInterfazPorTurno(turno){
        const datos = datosTurno[turno]
        tarjetaForm.className = "form-container " + datos.claseTema
        selectHorario.innerHTML = ""
        datos.horarios.forEach(horario => {
            const opcion = document.createElement("option")
            opcion.value = horario
            opcion.textContent = horario
            selectHorario.appendChild(opcion)
        })
        msgInfoTurno.innerHTML = datos.info
    }
    actualizarInterfazPorTurno("manana")
    opcionesTurno.forEach(radio => {
        radio.addEventListener("change", (e) => {
            actualizarInterfazPorTurno(e.target.value)
        })
    })
    
    inputTelefono.addEventListener("keydown", (e) => {
        const controles = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"]
        if (controles.includes(e.key)) return;
        if(/\D/.test(e.key)){
            errorTelefono.style.display = "block"
        }else {
            errorTelefono.style.display = "none"
        }
    })
    areaBio.addEventListener("keyup", () => {
        numContador.textContent = 60 - areaBio.value.length
    })
    chkAceptar.addEventListener("change", () => {
        btnEnviar.disabled = !chkAceptar.checked
    })

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault()
        if(inputTelefono.value.trim() == ""){
            alert("Por favor ingrese su teléfono")
            return;
        }
        const turnoSeleccionado = document.querySelector(
            "input[name='turno']:checked").parentNode.textContent.trim()
        
        boxExito.innerHTML = `
        <strong>Matrícula Exitosa</strong> <br /> <br />
        <strong>Teléfono:</strong> ${inputTelefono.value} <br />
        <strong>Turno:</strong> ${turnoSeleccionado} <br />
        <strong>Horario:</strong> ${selectHorario.value} <br />
        <strong>Motivo:</strong> ${areaBio.value} <br />
        `
        boxExito.style.display = "block"

    })

})
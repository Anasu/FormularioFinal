window.onload = function() 
{
    let submit = document.getElementById("enviar");
    submit.addEventListener("click", function(event)
    {
        event.preventDefault();

        date.dateFormat = new Date
        (
            document.getElementById("ano").value,
            document.getElementById("mes").value - 1,
            document.getElementById("dia").value
        );
        valCampo(rut);
        valCampo(name);
        valCampo(lname);
        valCampo(age);
        valCampo(email);
        valDate(date);
        bienvenida(errorCount);
    });

    let errorCount = 0;
    let rut = {
    dom:  document.getElementById("rut"),
    regex: /^\d{7,8}-[\dk]{1}$/,
    errorID: document.getElementById("rut_error")
    };

    let name = {
        dom: document.getElementById("fname"),
        regex: /[A-Za-z\u00C0-\u00ff\s]+/,
        errorID: document.getElementById("fname_error")
    };

    let lname = {
    dom: document.getElementById("lname"),
    regex: /[A-Za-z\u00C0-\u00ff\s]+/,
    errorID: document.getElementById("lname_error")
    };

    let age = {
    dom: document.getElementById("age"),
    regex: /[\d\s]+/,
    errorID: document.getElementById("age_error")
    };

    let email = {
        dom: document.getElementById("email"),
        regex: /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-]{3,}\.)+([a-zA-Z]{2,5})$/,
        errorID: document.getElementById("email_error")
    };

    let date = {
        day: document.getElementById("dia"),
        month: document.getElementById("mes"),
        year: document.getElementById("ano"),
        errorID: document.getElementById("fecha_error") 
    };

    let specialty = document.getElementById("specialties");
    let hour = document.getElementById("hour");

    // Las Funciones: 
    const valCampo = function(objeto)
    {
        let errorDiv = objeto.errorID;
        errorDiv.style.display = "none";
        errorCount = 0;
        if(objeto.dom.value == "")
        {
            //console.log("No puedes dejar el "+objeto.element+" vacío.");
            errorCount++;
            errorDiv.style.display = "block";
        }
        else if(!objeto.regex.test(objeto.dom.value))
        {
            //console.log("el "+objeto.element+" esta mal escrito");
            errorCount++;
            errorDiv.style.display = "block";
        }
    };

    const valDate = function(date)
    {
        let errorDiv = date.errorID;
        errorDiv.style.display = "none";
        errorCount = 0;
        if(date.day.value == "" || date.month.value == "" || date.year.value == "")
        {
            //console.log("la "+date.element+" está vacia");
            errorCount++;
            errorDiv.style.display = "block";
        }
        else if ((date.dateFormat.getUTCMonth() != date.month.value - 1) || (
            date.dateFormat.getUTCDate() != date.day.value) || (
            date.dateFormat.getUTCFullYear() != date.year.value))
        {
            //console.log("la "+date.element+" no existe");
            errorCount++;
            errorDiv.style.display = "block";
        };

    };

    const bienvenida = function(errorCount)
    {
        if(errorCount == 0)
        {
            //console.log("todo se anti-derrumbó");
            Swal.fire({
            icon: 'success',
            title: 'Reserva de hora exitosa',
            html: `<p>Estimado(a) ${name.dom.value} ${lname.dom.value}, 
            su hora para ${specialty.value} ha sido reservada para el
            día ${date.day.value} del ${date.month.value} a las ${hour.value}. 
            Además, se le envió un mensaje a su correo ${email.dom.value} con el 
            detalle de su cita.</p>
            <p>Gracias por preferirnos.</p>`,
            confirmButtonText: 'Aceptar'
            });
        }
    }
}

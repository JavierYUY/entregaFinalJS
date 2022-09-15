let agenda;

function prepararAgenda(){
    if(agenda != null){
        agenda = JSON.parse(localStorage.getItem('agenda'));
        console.log('agenda recuperada')
    }else{
        agenda = [
            {'dia': 'lunes', 'maniana': false, 'tarde': false, 'noche': false, 'terapeuta': ''},
            {'dia': 'martes', 'maniana': false, 'tarde': false, 'noche': false, 'terapeuta': ''},
            {'dia': 'miercoles', 'maniana': false, 'tarde': false, 'noche': false, 'terapeuta': ''},
            {'dia': 'jueves', 'maniana': false, 'tarde': false, 'noche': false, 'terapeuta': ''},
            {'dia': 'viernes', 'maniana': false, 'tarde': false, 'noche': false, 'terapeuta': ''}
        ]
        console.log('agenda creada')
    }
}

function agendarDia(dia, man, tar, noche, terapeuta){
    this.agendaDia = dia;
    this.maniana = man;
    this.tarde = tar;
    this.noche = noche;
    this.terapeuta = terapeuta;
    
    console.log('En agendaDia: ' + dia + ' ' + this.maniana + ' ' + this.tarde + ' ' + this.noche + ' ' + this.terapeuta);

    switch(this.agendaDia){
        case 'lunes':
            agenda[0].maniana = this.maniana;
            agenda[0].tarde = this.tarde;
            agenda[0].noche = this.noche;
            agenda[0].terapeuta = this.terapeuta;
            break;
        case 'martes':
            agenda[1].maniana = this.maniana;
            agenda[1].tarde = this.tarde;
            agenda[1].noche = this.noche;
            agenda[1].terapeuta = this.terapeuta;
            break;
        case 'miercoles':
            agenda[2].maniana = this.maniana;
            agenda[2].tarde = this.tarde;
            agenda[2].noche = this.noche;
            agenda[2].terapeuta = this.terapeuta;
            break;
        case 'jueves':
            agenda[3].maniana = this.maniana;
            agenda[3].tarde = this.tarde;
            agenda[3].noche = this.noche;
            agenda[3].terapeuta = this.terapeuta;
            break;
        case 'viernes':
            agenda[4].maniana = this.maniana;
            agenda[4].tarde = this.tarde;
            agenda[4].noche = this.noche;
            agenda[4].terapeuta = this.terapeuta;
            break;
        default:
            break;
    }
}

let hora = "";
let diaSeleccionado = '';
let divSeleccionado;

function divBotonDia(elDia){
    console.log('DivBotonDia')
    prepararAgenda();

    console.log(agenda);
    let mani = false;
    let tard = false;

    switch(elDia){
        case 'lunes':
            diaSeleccionado = agenda[0];
            divSeleccionado = document.querySelector('#divLunes');
            break;
        case 'martes':
            diaSeleccionado = agenda[1];
            divSeleccionado = document.querySelector('#divMartes');
            break;
        case 'miercoles':
            diaSeleccionado = agenda[2];
            divSeleccionado = document.querySelector('#divMiercoles');
            break;
        case 'jueves':
            diaSeleccionado = agenda[3];
            divSeleccionado = document.querySelector('#divJueves');
            break;
        case 'viernes':
            diaSeleccionado = agenda[4];
            divSeleccionado = document.querySelector('#divViernes');
            break;
        default:
            break;
    }
    
    const popup = document.querySelector('.popupDetalle')
    popup.classList.remove('d-none')
    imprimirDetalle(diaSeleccionado, popup)
}

function imprimirDetalle(diaSeleccionado, popup){
    let {dia, maniana, tarde, noche} = diaSeleccionado;
    console.log('dia ' + dia + ' mañana ' + maniana + ' tarde ' + tarde + ' noche ' + noche)

    let checkMan = maniana == true ? 'checked disabled' : '';
    let checkTar = tarde == true ? 'checked disabled' : '';
    let CheckNoc = noche == true ? 'checked disabled' : '';
    let url = 'http://hp-api.herokuapp.com/api/characters/staff';
    let divPopup = '';

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
        //console.log(resp);
        divPopup = `<div>
                                <div class="closePopup">Salir</div>
                                <section class="product-detail">
                                    <div class="descripcion-detail">

                                        <div class="divCheckBox" >
                                            <div>
                                                <input type="checkbox" id="cbmaniana" name="maniana" ${checkMan}>
                                                <label for="maniana">Mañana</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="cbtarde" name="tarde" ${checkTar}>
                                                <label for="tarde">Tarde</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="cbnoche" name="noche" ${CheckNoc}>
                                                <label for="noche">Noche</label>
                                            </div>
                                        </div>

                                        <div>
                                            <select name="terapeuta" id="cboTerapeuta">
                                                <option value="Sin Seleccionar">--Seleccione un Terapeuta--</option>`
                                                
                                                resp.forEach(element => {
                                                    const {name, house} = element;
                                                    divPopup += `<option value="${name}">${name}</option>`
                                                });
                                                
        divPopup += `</select>
                        <div class="click">
                            <label id="lblHoras">Cantidad de Horas</label>
                            <span class="less">-</span>
                            <span class="resultado">0</span>
                            <span class="more">+</span>
                        </div>
                    <div class="btnAgenda">AGENDAR</div></div>
                </section>
                </div>`
        
        popup.innerHTML = divPopup;

        const closePopup = document.querySelector('.closePopup')
        const more = document.querySelector('.more')
        const less = document.querySelector('.less')
        const resultado = document.querySelector('.resultado')
        const agragarConsulta = document.querySelector('.btnAgenda')
        const cbmaniana = document.querySelector('#cbmaniana');
        const cbtarde = document.querySelector('#cbtarde');
        const cbnoche = document.querySelector('#cbnoche');
        let contador = 0
        
        more.onclick = () => {
            contador++
            contador = contador > 3 ? 3 : contador
            resultado.innerText = contador
        }

        less.onclick = () => {
            contador--
            contador = contador < 0 ? 0 : contador
            resultado.innerText = contador
        }

        closePopup.onclick = () => {
            popup.classList.add('d-none')
        }

        cbmaniana.onclick = () => {
            maniana = !maniana;
        }

        cbtarde.onclick = () => {
            tarde = !tarde;
        }

        cbnoche.onclick = () => {
            noche = !noche;
        }

        agragarConsulta.onclick = () => {
            let select = document.getElementById('cboTerapeuta');
            let terapeuta = select.options[select.selectedIndex].value;
            console.log(terapeuta);
            let validado = true;

            if(!maniana && !tarde && !noche){
                validado = false;

                swal({
                    title: 'Error!',
                    text: 'Debe seleccionar un horario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }

            if (validado && terapeuta == 'Sin Seleccionar') {
                validado = false;

                swal({
                    title: 'Error!',
                    text: 'Debe seleccionar un terapeuta',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }

            if(validado && contador == 0){
                validado = false;

                swal({
                    title: 'Error!',
                    text: 'Debe ingresar el numero de horas',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }

            if (validado) {
                agendarDia(dia, maniana, tarde, noche, terapeuta)
                console.log(agenda)
                localStorage.setItem('agenda', JSON.stringify(agenda));

                swal({
                    title: `Agenda Confirmada!`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
            }
        }
    })
}

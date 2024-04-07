let participantes = [
    {
        nome: "Bruno Machado",
        email: "mache.brino@gmail.com",
        dataInscricao: new Date(2024, 1, 14, 19, 20),
        dataCheckIn: new Date(2024, 2, 15, 6, 0)
    },
    {
        nome: "Mariza Santos",
        email: "ma.sts@gmail.com",
        dataInscricao: new Date(2024, 2, 4, 19, 20),
        dataCheckIn: null
    }
]

const geraParticipante = (participante) => { //function arrow
    const dataInscricaoTratada = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckInTratada = dayjs(Date.now()).to(participante.dataCheckIn)
    
    if(participante.dataCheckIn == null) {
        dataCheckInTratada = `
            <button 
                data-email="${participante.email}"
                onclick="confirmaCheckIn(event)"
            >
                Confirmar check-in
            </button>
        `
    }

    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
                ${participante.email}
            </small>
        </td>
        <td>${dataInscricaoTratada}</td>
        <td>${dataCheckInTratada}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => { //function arrow
    let output = ""
    for(let participante of participantes) {
        output += geraParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosForm = new FormData(event.target)

    const participante = {
        nome: dadosForm.get('nome'),
        email: dadosForm.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) => {
            return p.email == participante.email
        }
    )

    if(participanteExiste) {
        alert('Email já cadastrado!')
        event.target.querySelector('[name="email"]').value = ""
        return
    }

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

}

const confirmaCheckIn = (event) => {
    const resultado = confirm("Gostaria de fazer o check-in?")

    if(resultado) {
        const participante = participantes.find(
            (p) => {
                return p.email == event.target.dataset.email
            }
        )

        participante.dataCheckIn = new Date()

        atualizarLista(participantes)
    }
}

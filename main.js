/* Selecionando o canvas no HTML */
const canvasCarro = document.getElementById("canvasCarro")

/* Alterandoa a altura e largura do canvas para  parecer uma estrada */
canvasCarro.width = 200

const canvasRede = document.getElementById("canvasRede")
canvasRede.width = 300


/* 
	O metodo HTMLCanvasElement.getContext() retorna 
	um contexto de desenho no canvas, 
	no nosso caso 2d 
*/ 
const ctxCarro = canvasCarro.getContext("2d")
const ctxRede = canvasRede.getContext("2d")

const estrada = new Estrada(canvasCarro.width / 2, canvasCarro.width * 0.9)

/* Substituindo um unico carro por 100 carros em paralelo */
n = 100
const carros = gerarCarros(n)
const trafego = [
	new Carro (estrada.getCentroFaixa(1), -100, 30, 50, "AUTO", 2)
]

let melhorCarro = carros[0]
if(localStorage.getItem("melhorCerebro")) {
	melhorCarro.cerebro = JSON.parse(
		localStorage.getItem("melhorCerebro")
	)
}

animar()

/* Salva o cerebro do melhor carro */
function salvar() {
	localStorage.setItem("melhorCerebro", JSON.stringify(melhorCarro.cerebro))
}

/* Deleta o cérebro salvo */
function deletar() {
	localStorage.removeItem("melhorCerebro")
}

function gerarCarros(n) {
	const carros = []
	for(let i = 1; i <= n; i++) {
		carros.push(new Carro(estrada.getCentroFaixa(1), 100, 30, 50, "IA"))
	}
	return carros
}

function animar(time) /* time vem de request animation frame */ {
	for(let i = 0; i < trafego.length; i++) {
		trafego[i].atualizar(estrada.limites, [])
	}
	
	for(let i = 0; i < carros.length; i++) {
    	carros[i].atualizar(estrada.limites, trafego)
	}

	// O melhor carro é o carro com o menor valor no eixo y
	const melhorCarro = carros.find(
		c => c.y == Math.min(
			...carros.map(c => c.y)
		)
	)

    canvasCarro.height = window.innerHeight // limpa a tela do último frame
	canvasRede.height = window.innerHeight

    ctxCarro.save()
	/* 
 		Essa translação colocará o carro no terço de baixo do canvas 
		e passará a impressão de que o que se move é a estrada
		e não o carro 
	*/
    ctxCarro.translate(0, -melhorCarro.y + canvasCarro.height * 0.7)

    estrada.desenhar(ctxCarro) // desenhando a estrada

	for(let i = 0; i < trafego.length; i++) {
		trafego[i].desenhar(ctxCarro, "red")
	} // desenhando o trafego

	ctxCarro.globalAlpha = 0.2 // tornando os carros semi-transparentes
	for(let i = 0; i < carros.length; i++) {
    	carros[i].desenhar(ctxCarro, "blue")
	}
	ctxCarro.globalAlpha = 1 
	/*  O melhor carro é desenhado com sensores e sem transparencia */
	melhorCarro.desenhar(ctxCarro, "blue", true)

    ctxCarro.restore()
	/* 
	 	requestAnimationFrame é uma callback function que colocará 
		nossa função animar em loop 
	*/    
	ctxRede.lineDashOffset = -time/50
	/* A rede neural desenhada correspode a do melhor carro */
	Visualizador.desenharRede(ctxRede, melhorCarro.cerebro)
	requestAnimationFrame(animar)
}

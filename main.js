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
const carro = new Carro (estrada.getCentroFaixa(1), 100, 30, 50, "IA")
const trafego = [
	new Carro (estrada.getCentroFaixa(1), -100, 30, 50, "AUTO", 2)
]

animar()

function animar(time) /* time vem de request animation frame */ {
	for(let i = 0; i < trafego.length; i++) {
		trafego[i].atualizar(estrada.limites, [])
	}

    carro.atualizar(estrada.limites, trafego)

    canvasCarro.height = window.innerHeight // limpa a tela do último frame
	canvasRede.height = window.innerHeight

    ctxCarro.save()
	/* 
 		Essa translação colocará o carro no terço de baixo do canvas 
		e passará a impressão de que o que se move é a estrada
		e não o carro 
	*/
    ctxCarro.translate(0, -carro.y + canvasCarro.height * 0.7)

    estrada.desenhar(ctxCarro) // desenhando a estrada

	for(let i = 0; i < trafego.length; i++) {
		trafego[i].desenhar(ctxCarro, "red")
	} // desenhando o trafego

    carro.desenhar(ctxCarro, "blue") // desenhando o carro

    ctxCarro.restore()
	/* 
	 	requestAnimationFrame é uma callback function que colocará 
		nossa função animar em loop 
	*/    
	ctxRede.lineDashOffset = -time/50
	Visualizador.desenharRede(ctxRede, carro.cerebro)
	requestAnimationFrame(animar)
}

//TODO Debbugar porque a direcao para frente nao e animada
/* Selecionando o canvas no HTML */
const canvas = document.getElementById("meuCanvas")

/* Alterandoa a altura e largura do canvas para  parecer uma estrada */
canvas.width = 200
/* 
	O metodo HTMLCanvasElement.getContext() retorna 
	um contexto de desenho no canvas, 
	no nosso caso 2d 
*/ 
const ctx = canvas.getContext("2d")

const carro = new Carro(100, 100, 30, 50) 
carro.desenhar(ctx)

animar()

function animar() {
	carro.atualizar()
	canvas.height = window.innerHeight // limpa a tela do último frame
	carro.desenhar(ctx)
	/* 
	 	requestAnimationFrame é uma callback function que colocará 
		nossa função animar em loop 
	*/
	requestAnimationFrame(animar)
}

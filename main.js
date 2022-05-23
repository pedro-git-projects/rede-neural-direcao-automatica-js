/* Selecionando o canvas no HTML */
const canvas = document.getElementById("meuCanvas")

/* Alterandoa a altura e largura do canvas para  parecer uma estrada */
canvas.width=200

/* 
	O metodo HTMLCanvasElement.getContext() retorna 
	um contexto de desenho no canvas, 
	no nosso caso 2d 
*/ 
const ctx = canvas.getContext("2d")

const estrada = new Estrada(canvas.width / 2, canvas.width * 0.9)
const carro = new Carro (estrada.getCentroFaixa(1), 100, 30, 50, "IA")
const trafego = [
	new Carro (estrada.getCentroFaixa(1), -100, 30, 50, "AUTO", 2)
]

animar()

function animar(){
	for(let i = 0; i < trafego.length; i++) {
		trafego[i].atualizar(estrada.limites, [])
	}

    carro.atualizar(estrada.limites, trafego)

    canvas.height=window.innerHeight // limpa a tela do último frame

    ctx.save()
	/* 
 		Essa translação colocará o carro no terço de baixo do canvas 
		e passará a impressão de que o que se move é a estrada
		e não o carro 
	*/
    ctx.translate(0, -carro.y + canvas.height * 0.7)

    estrada.desenhar(ctx) // desenhando a estrada

	for(let i = 0; i < trafego.length; i++) {
		trafego[i].desenhar(ctx, "red")
	} // desenhando o trafego

    carro.desenhar(ctx, "blue") // desenhando o carro

    ctx.restore()
	/* 
	 	requestAnimationFrame é uma callback function que colocará 
		nossa função animar em loop 
	*/    
	requestAnimationFrame(animar)
}

/* Selecionando o canvas no HTML */
const canvas = document.getElementById("meuCanvas")

/* Alterandoa a altura e largura do canvas para  parecer uma estrada */
canvas.height = window.innerHeight
canvas.widht = 200 

/* 
	O metodo HTMLCanvasElement.getContext() retorna 
	um contexto de desenho no canvas, 
	no nosso caso 2d 
*/ 
const ctx = canvas.getContext("2d")

const carro = new Carro(100, 100, 30, 50) 
carro.desenhar(ctx)

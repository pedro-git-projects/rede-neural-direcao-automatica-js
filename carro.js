class Carro {
	constructor(x, y, largura, altura) {
		this.x = x
		this.y = y
		this.largura = largura
		this.altura = altura
	}

	desenhar(ctx) {
		/* Nota pra o trabalho: 
		Como o contexto é definido pela linguagem os
		métodos não podem ser renomeados e ficam em inglês */
		ctx.beginPath()
		ctx.rect(
			this.x - this.largura / 2,
			this.y - this.altura / 2,
			this.largura,
			this.altura
		)
		ctx.fill()
	}
}



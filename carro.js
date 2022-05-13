class Carro {
	constructor(x, y, largura, altura) {
		this.x = x
		this.y = y
		this.largura = largura
		this.altura = altura

		this.controle = new Controle()
	}

	atualizar() {
		if(this.controle.paraFrente) {
			this.y = this.y - 2
			console.log(this.controle.paraFrente)
		}

		if(this.controle.re) {
			this.y += 2
			console.log(this.controle.re)
		}

		if(this.controle.paraEsquerda) {
			this.x += 2
		}

		if(this.controle.paraDireita) {
			this.x -= 2
		}
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



class Estrada {
	constructor(x, largura, numFaixas = 3) {
		this.x = x
		this.largura = largura
		this.numFaixas = numFaixas

		this.esquerda = x - largura/2
		this.direita = x + largura/2

		const limite = 1000000 
		this.topo = -limite
		this.final = limite 
	}

	desenhar(ctx) {
		ctx.lineWidth = 5
		ctx.strokeStyle = "white"

		for(let i = 0; i <= this.numFaixas; i++) {
			const x = interpolacaoLinear(
				this.esquerda,
				this.direita,
				i/this.numFaixas
			)

			/* Linha vertical do lado esquerdo da tela*/
			ctx.beginPath()
			ctx.moveTo(x, this.topo)
			ctx.lineTo(x, this.final)
			ctx.stroke()
		}
	}
}

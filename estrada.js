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

		/* Linha vertical do lado esquerdo da tela*/
		ctx.beginPath()
		ctx.moveTo(this.esquerda, this.topo)
		ctx.lineTo(this.esquerda, this.final)
		ctx.stroke()

		/* Linha vertical do lado direito da tela*/
		ctx.beginPath()
		ctx.moveTo(this.direita, this.topo)
		ctx.lineTo(this.direita, this.final)
		ctx.stroke()
	}
}

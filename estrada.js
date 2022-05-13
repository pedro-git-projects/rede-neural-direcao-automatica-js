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

	/* 
	 	Retorna o centro de uma faixa dado seu index 
		faixas serão indexadas da esquerda para a direita
		e são 0-indexadas
	*/
	getCentroFaixa(indexFaixa) {
		const larguraDaFaixa = this.largura/this.numFaixas
		return this.esquerda + larguraDaFaixa / 2 +
			/* Corrigindo possíveis estouros de faixa */
            Math.min(indexFaixa,this.numFaixas - 1) * larguraDaFaixa
	}

	desenhar(ctx) {
		ctx.lineWidth = 5
		ctx.strokeStyle = "white"

		/* 
		 	Usa interpolação linear para desenhar as faixas 
			de acordo com numFaixas
		*/
		for(let i = 0; i <= this.numFaixas; i++) {
			const x = interpolacaoLinear(
				this.esquerda,
				this.direita,
				i/this.numFaixas
			)

			/* Fazendo com que as faixas do centro fiquem pontilhadas */
			if(i > 0 && i < this.numFaixas) {
				ctx.setLineDash([20, 20])
			} else {
				ctx.setLineDash([])
			}

			ctx.beginPath()
			ctx.moveTo(x, this.topo)
			ctx.lineTo(x, this.final)
			ctx.stroke()
		}
	}
}

class Estrada {
	constructor(x, largura, numFaixas = 3) {
		this.x = x
		this.largura = largura
		this.numFaixas = numFaixas

		this.esquerda = x - largura/2
		this.direita = x + largura/2

		const limite = 1000000 // Limite é um número arbitrário para o fim da estrada 
		this.topo = -limite
		this.final = limite 

		const topoEsquerda = { x: this.esquerda, y: this.topo }
		const topoDireita = { x: this.direita, y: this.topo }
		const fimEsquerda = { x: this.esquerda, y: this.final }
		const fimDireita = { x: this.direita, y: this.final }

		/* Limites representa as possíveis hitboxes da estrada */
		this.limites = [
			[topoEsquerda, fimEsquerda],
			[topoDireita, fimDireita],
		]
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
		for(let i = 1; i<=this.numFaixas - 1; i++) {
			const x = interpolacaoLinear(
				this.esquerda,
				this.direita,
				i/this.numFaixas
			)

			ctx.setLineDash([20, 20]) // linhas pontilhadas
			ctx.beginPath()
			ctx.moveTo(x, this.topo)
			ctx.lineTo(x, this.final)
			ctx.stroke()
		}

		/* Desenhando as linhas das bordas de acordo com os limites de colisão */
		ctx.setLineDash([])
		this.limites.forEach(limite => {
			ctx.beginPath()
			ctx.moveTo(limite[0].x, limite[0].y)
			ctx.lineTo(limite[1].x, limite[1].y)
			ctx.stroke()
		})
	}
}

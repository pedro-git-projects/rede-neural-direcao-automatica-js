class Sensor {
	constructor(carro) {
		this.carro = carro
/* 
	A ideia é que os sensores vão projetar raios 
	em uma espécie de sistema raycasting.  
	Os raios checam as colisões na trajetória projetada
*/
		this.qtdeRaios = 5
		this.comprimentoRaio = 150
		this.dispersaoRaios = Math.PI/2

		this.raios=[]
		this.leituras=[]
	}

	atualizar(limitesEstrada) {
		this.#projetarRaios()

		this.leituras = []
		for(let i=0; i<this.raios.length; i++) {
			this.leituras.push(
				this.#getLeitura(this.raios[i],limitesEstrada)
			)
		}
	}

	#getLeitura(raio,limitesEstrada) {
		let colisoes=[]
		/* Buscando colisão e armazenando em colisao */
		for(let i=0; i < limitesEstrada.length; i++) {
			const colisao=getInterseccao(
				raio[0],
				raio[1],
				limitesEstrada[i][0],
				limitesEstrada[i][1]
			)
			/* Caso haja uma colião, ela é adicionada ao array colisoes*/
			if(colisao) {
				colisoes.push(colisao)
			}
		}
		/* Retornando null caso não haja colisões */
		if(colisoes.length == 0) {
			return null
		} else {
			/* Encontrando os offsets */
			const offsets=colisoes.map(e => e.offset)
			/* Encontrando o valor mínimo via spread */
			const minOffset=Math.min(...offsets)
			/* Retornando o offset mínimo */
			return colisoes.find(e => e.offset == minOffset)
		}
	}

	/* Projeta os raios do sensor */
	#projetarRaios() {
		this.raios=[]
		for(let i = 0; i < this.qtdeRaios; i++) {
			const anguloRaio = interpolacaoLinear(
				this.dispersaoRaios / 2,
				-this.dispersaoRaios / 2,
				/* Tornando possível projetar um único raio */
				this.qtdeRaios == 1 ? 0.5 : i / (this.qtdeRaios - 1)
			) + this.carro.angulo

			const inicio = { x: this.carro.x, y: this.carro.y}
			const fim={
				x:this.carro.x-
				Math.sin(anguloRaio) * this.comprimentoRaio,
				y:this.carro.y-
				Math.cos(anguloRaio) * this.comprimentoRaio
			}
			this.raios.push([inicio, fim])
		}
	}

	/* Desenhando os raios projetados de amarelo até a colisão e de preto depois */
	desenhar(ctx){
		for(let i=0; i<this.qtdeRaios; i++) {

			let fim=this.raios[i][1]
			if(this.leituras[i]){
				fim=this.leituras[i]
			}

			ctx.beginPath()
			ctx.lineWidth=2
			ctx.strokeStyle="yellow"
			ctx.moveTo(
				this.raios[i][0].x,
				this.raios[i][0].y
			)
			ctx.lineTo(
				fim.x,
				fim.y
			)
			ctx.stroke()

			ctx.beginPath()
			ctx.lineWidth=2
			ctx.strokeStyle="black"
			ctx.moveTo(
				this.raios[i][1].x,
				this.raios[i][1].y
			)
			ctx.lineTo(
				fim.x,
				fim.y
			)
			ctx.stroke()
		}
	}        
}

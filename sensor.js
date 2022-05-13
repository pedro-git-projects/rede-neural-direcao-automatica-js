class Sensor {
	constructor(carro) {
		this.carro = carro
		/* 
		    A ideia é que os sensores vão projetar raios 
			em uma espécie de sistema raycasting 
		*/
		this.qtdeRaios = 10 
		this.comprimentoRaio = 150
		this.dispersaoRaios = Math.PI / 2 // == 90 graus

		this.raios = []
	}

	atualizar() { 
		this.raios = []
		for(let i = 0; i < this.qtdeRaios; i++) {
			const anguloRaio = interpolacaoLinear(
				this.dispersaoRaios / 2, 
				-this.dispersaoRaios / 2, 
				/* Tornando possível projetar um único raio */
				this.qtdeRaios == 1 ? 0.5 : i/(this.qtdeRaios - 1)
		) + this.carro.angulo

			const inicio = { x: this.carro.x, y: this.carro.y }
			const fim = { 
				x: this.carro.x - 
					Math.sin(anguloRaio) * this.comprimentoRaio, 
				y: this.carro.y -
					Math.cos(anguloRaio) * this.comprimentoRaio
			}
			this.raios.push([inicio, fim])
		}	
	}

	/* Desenhando os raios projetados */
	desenhar(ctx) {
		for(let i = 0; i < this.qtdeRaios; i++) {
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = "yellow"
			ctx.moveTo(
				this.raios[i][0].x,
				this.raios[i][0].y
			)
			ctx.lineTo(
				this.raios[i][1].x,
				this.raios[i][1].y
			)
			ctx.stroke()
		}
	}
}

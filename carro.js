class Carro {
	constructor(x, y, largura, altura) {
		this.x = x
		this.y = y
		this.largura = largura
		this.altura = altura

		this.velocidade = 0
		this.aceleracao = 0.2
		this.velMaxima = 3
		this.atrito = 0.05
		this.angulo = 0
		this.danificado = false

		this.sensor = new Sensor(this)
		this.controle = new Controle()
	}

	atualizar(limitesEstrada){
		this.#movimento()
		this.poligono = this.#criarPoligono()
		this.danificado = this.#verificarDano(limitesEstrada)
		this.sensor.atualizar(limitesEstrada)
	}

	#verificarDano(limitesEstrada) {
		for(let i = 0; i < limitesEstrada.length; i++) {
			/* Testando se há intersecção entre o carro e os limites */
			if(interecPolig(this.poligono, limitesEstrada[i])) {
				console.log(true)
				return true
			}
		}
		console.log(false)
		return false
	}

	#criarPoligono() {
		/* Um ponto por quina do carro*/
		const pontos = []
		/* Raio */
		const rad = Math.hypot(this.largura, this.altura) / 2
		/* Angulo */
		const alfa = Math.atan2(this.largura, this.altura)
		pontos.push({
			x : this.x - Math.sin(this.angulo - alfa) * rad,
			y : this.y - Math.cos(this.angulo - alfa) * rad
		})
		pontos.push({
			x : this.x - Math.sin(this.angulo + alfa) * rad,
			y : this.y - Math.cos(this.angulo + alfa) * rad
		})	
		pontos.push({
			x : this.x - Math.sin(Math.PI + this.angulo - alfa) * rad,
			y : this.y - Math.cos(Math.PI + this.angulo - alfa) * rad
		})	
		pontos.push({
			x : this.x - Math.sin(Math.PI + this.angulo + alfa) * rad,
			y : this.y - Math.cos(Math.PI + this.angulo + alfa) * rad
		})	
		return pontos
	}

	#movimento(){

		/* Anda para frente */
		if(this.controle.frente) {
			this.velocidade += this.aceleracao
		}

		/* Anda de ré */
		if(this.controle.re) {
			this.velocidade -= this.aceleracao
		}

		/* Cap na velocidade máxima de frente */
		if(this.velocidade > this.velMaxima) {
			this.velocidade=this.velMaxima
		}

		/* Cap na velocidade máxima de ré */
		if(this.velocidade < -this.velMaxima/2) {
			/* A velocidade máxima de ré é metade da normal */
			this.velocidade = -this.velMaxima/2
		}

		/* Desacelerado devido ao atrito */
		if(this.velocidade > 0) {
			this.velocidade -= this.atrito
		}

		/* Atrito contribuindo para frenagem */
		if(this.velocidade < 0) {
			this.velocidade += this.atrito
		}

		/* Evitando movimento constante do carro por causa do atrito */
		if(Math.abs(this.velocidade) < this.atrito) {
			this.velocidade=0
		}

		/* Movimento lateral */
		if(this.velocidade != 0) {
			const rotacao = this.velocidade > 0 ? 1 : -1
			if(this.controle.esquerda){
				this.angulo+=0.03*rotacao;
			}

			if(this.controle.direita) {
				this.angulo -= 0.03 *rotacao
			}
		}

		/* Corrigndo tank controls */
		this.x -= Math.sin(this.angulo)*this.velocidade
		this.y -= Math.cos(this.angulo)*this.velocidade
	}

	desenhar(ctx) {
		ctx.beginPath()	
		/* Desenhando o carro utilizando os pontos */
		ctx.moveTo(this.poligono[0].x, this.poligono[0].y)
		for(let i = 1; i < this.poligono.length; i++) {
			ctx.lineTo(this.poligono[i].x, this.poligono[i].y)
		}
		ctx.fill()
		this.sensor.desenhar(ctx)
	}
}

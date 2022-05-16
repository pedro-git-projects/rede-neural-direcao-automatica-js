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

		this.sensor = new Sensor(this)
		this.controle = new Controle()
	}

	atualizar(limitesEstrada){
		this.#movimento()
		this.sensor.atualizar(limitesEstrada)
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
		ctx.save()
		ctx.translate(this.x,this.y)
		ctx.rotate(-this.angulo)

		ctx.beginPath()
		ctx.rect(
			-this.largura/2,
			-this.altura/2,
			this.largura,
			this.altura
		);
		ctx.fill()

		ctx.restore()

		this.sensor.desenhar(ctx)
	}
}

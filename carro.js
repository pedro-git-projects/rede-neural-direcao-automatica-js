class Carro {
	constructor(x, y, largura, altura, tipoControle, velMaxima = 3) {
		this.x = x
		this.y = y
		this.largura = largura
		this.altura = altura

		this.velocidade = 0
		this.aceleracao = 0.2
		this.velMaxima = velMaxima 
		this.atrito = 0.05
		this.angulo = 0
		this.danificado = false

		/* Se o tipo de controle for AI a rede neural controlara o carro */
		this.usarCerebro = tipoControle == "IA"

		/* O carro que não é o principal não precisa de sensores */
		if(tipoControle != "AUTO") {
			this.sensor = new Sensor(this)
			/* Nossa rede neural tera tantos niveis quanto raios do sensor */
			this.cerebro = new RedeNeural(
				[this.sensor.qtdeRaios, 6, 4]
			)
		}
		this.controle = new Controle(tipoControle)
	}

	atualizar(limitesEstrada, trafego) {
		/* Para o carro se ele for danificado */
		if(!this.danificado) {
			this.#movimento()
			this.poligono = this.#criarPoligono()
			this.danificado = this.#verificarDano(limitesEstrada, trafego)
		}
		/* Checando se há um sensor para ser atualizado */
		if(this.sensor) {
			this.sensor.atualizar(limitesEstrada, trafego)
			/* 
			 	Para fazer com que os neurons recebam valores baixos se 
				o objeto esta longe
				e valores altos se esta perto 
			*/
			const offsets = this.sensor.leituras.map(
				s => s == null ? 0 :  1 - s.offset
			)
			const saidas = RedeNeural.passaParaFrente(offsets, this.cerebro)
			console.log(saidas)

			if(this.usarCerebro) {
				this.controle.frente = saidas[0]
				this.controle.esquerda = saidas[1]
				this.controle.direita= saidas[2]
				this.controle.re = saidas[3]
			}
		}
	}

	#verificarDano(limitesEstrada, trafego) {
		for(let i = 0; i < limitesEstrada.length; i++) {
			/* Testando se há intersecção entre o carro e os limites */
			if(interecPolig(this.poligono, limitesEstrada[i])) {
				return true
			}
		}

		for(let i = 0; i < trafego.length; i++) {
			/* Testando se há intersecção entre um carro e outro */
			if(interecPolig(this.poligono, trafego[i].poligono)) {
				return true
			}
		}

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

	desenhar(ctx, cor) {
		/* 
			Testando se o carro está danificado, 
			se sim, desenha em cinza	
		*/
		if(this.danificado) {
			ctx.fillStyle = "gray"
		} else {
			ctx.fillStyle = cor 
		}

		ctx.beginPath()	
		/* Desenhando o carro utilizando os pontos */
		ctx.moveTo(this.poligono[0].x, this.poligono[0].y)
		for(let i = 1; i < this.poligono.length; i++) {
			ctx.lineTo(this.poligono[i].x, this.poligono[i].y)
		}
		ctx.fill()
		
		/* Checa se há um sensor para ser desenhado */
		if(this.sensor) {
			this.sensor.desenhar(ctx)
		}
	}
}

class RedeNeural {
	constructor(quantidadeNeurons) {
		this.niveis = [] // uma rede neural será um array de niveis 

		for(let i = 0; i < quantidadeNeurons.length - 1; i++) {
			this.niveis.push(new Nivel(
				quantidadeNeurons[i], quantidadeNeurons[i + 1]
			))
		}
	}

	static passaParaFrente(entradasDadas, rede) {
		let saidas = Nivel.passaParaFrente(entradasDadas, rede.niveis[0]) // produz a saida do primeiro nivel
		// iterando os niveis subsequentes
		for(let i = 1; i < rede.niveis.length; i++) {
			// passando a saida do ultimo nivel para o proximo nivel como entrada 
			saidas = Nivel.passaParaFrente(saidas, rede.niveis[i])
		}
		return saidas
	}

	/* Causa mutações na nossa rede neural */
	static mutar(rede, quantidade = 1) {
		rede.niveis.forEach(nivel => {
			for(let i = 0; i < nivel.biases.length; i++) {
				nivel.biases[i] = interpolacaoLinear(
					nivel.biases[i], 
					Math.random() * 2 - 1, 
					quantidade
			)
			}
			for(let i = 0; i < nivel.pesos.length; i++) {
				for(let j = 0; j < nivel.pesos[i].length; j++) {
					nivel.pesos[i][j] = interpolacaoLinear(
						nivel.pesos[i][j], 
						Math.random() * 2 - 1, 
						quantidade
				)
				}
			}
		})
	}
}

class Nivel {
	constructor(quantidadeEntradas, quantidadeSaidas) {
		/* Definindo neuronios */
		this.entradas = new Array(quantidadeEntradas)
		this.saidas = new Array(quantidadeSaidas)
		/* Valor acima do qual um neuronio dispara */
		this.biases = new Array(quantidadeSaidas) 
		/* Pesos das conexoes das neurais */
		this.pesos = []
		/* Ligando todas entradas as saidas */
		for(let i = 0; i < quantidadeEntradas; i++) {
			this.pesos[i] = new Array(quantidadeSaidas)
		}

		/* Comecando com uma rede aleatoria */
		Nivel.#randomizar(this)
	}

	static #randomizar(nivel) {
		for(let i = 0; i < nivel.entradas.length; i++) {
			for(let j = 0; j < nivel.saidas.length; j++) {
				/* Atribuindo valores aleatorios entre -1 e 1 */
				nivel.pesos[i][j] = Math.random() * 2 - 1
			}
		}
		for(let i = 0; i < nivel.biases.length; i++) {
			nivel.biases[i] = Math.random() * 2 - 1
		}	
	}

	/* 
	 	Computa os valores da saída;
		entradasDadas se refere as leituras do sensores
		Calculamos a soma entre a soma das entradas e os pesos
		Caso a soma seja maior que os biases, o neuronio sera ativado
	*/
	static passaParaFrente(entradasDadas, nivel) {
		for(let i = 0; i < nivel.entradas.length; i++) {
			nivel.entradas[i] = entradasDadas[i]
		}

		for(let i = 0; i < nivel.saidas.length; i++) {
			let soma = 0
			for(let j = 0; j < nivel.entradas.length; j++) {
				soma += nivel.entradas[j] * nivel.pesos[j][i]
			}

			if(soma > nivel.biases[i]) {
				nivel.saidas[i] = 1
			} else {
				nivel.saidas[i] = 0
			}
		}
		return nivel.saidas
	}
}

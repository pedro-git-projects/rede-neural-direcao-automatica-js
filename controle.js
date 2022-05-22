class Controle {
	constructor(tipo) {
		this.frente = false
		this.esquerda = false
		this.direita = false
		this.re = false
		
		switch(tipo) {
			case "PRINCIPAL":
				this.#addKeyboardListeners()
				break
			case "AUTO":
				this.frente = true
				break
		}
	}

	/* Método privado para pegar eventos do teclado */
	#addKeyboardListeners() {
		/* 
			Utilizamos arrow functions para que o this 
			se refira a classe controle 
			caso a palavra function fosse utilizada, 
			this se refereira a função
		*/
		document.onkeydown = (event) => {
			switch(event.key) {
				case "ArrowLeft":
					this.esquerda = true
					break
				case "ArrowRight":
					this.direita = true
					break
				case "ArrowUp":
					this.frente = true
					break
				case "ArrowDown":
					this.re = true
					break
			}
		}

		document.onkeyup = (event) => {
			switch(event.key) {
				case "ArrowLeft":
					this.esquerda = false 
					break
				case "ArrowRight":
					this.direita = false 
					break
				case "ArrowUp":
					this.frente = false 
				case "ArrowDown":
					this.re = false 
			}
		}
	}
}

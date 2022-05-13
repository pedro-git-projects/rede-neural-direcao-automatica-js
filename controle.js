class Controle {
	constructor() {
		this.paraFrente = false
		this.paraEsquerda= false
		this.paraDireita = false
		this.re = false

		this.#addKeyboardListeners()
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
					this.paraEsquerda = true
					break
				case "ArrowRight":
					this.paraDireita = true
					break
				case "ArrowUp":
					this.paraFrente = true
				case "ArrowDown":
					this.re = true
			}
		}

		document.onkeyup = (event) => {
			switch(event.key) {
				case "ArrowLeft":
					this.paraEsquerda = false 
					break
				case "ArrowRight":
					this.paraDireita = false 
					break
				case "ArrowUp":
					this.paraFrente = false 
				case "ArrowDown":
					this.re = false 
			}
		}
	}
}

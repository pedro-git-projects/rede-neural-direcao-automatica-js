function interpolacaoLinear(A, B, t) {
	return A + (B - A) * t
}
/* Eu queria usar arrow function, mas não funciona de outro arquivo */
// const interpolacaoLinear = (A, B, t) => A + (B - A) * t

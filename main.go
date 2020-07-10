package main

import (
	"math"
	"syscall/js"
)

func calculateCompoundInterest(this js.Value, i []js.Value) interface{} {
	callback := i[len(i)-1:][0]
	p := i[0].Float()
	r := i[1].Float()
	t := i[2].Float()
	n := i[3].Float()

	A := p * (math.Pow((1 + r/n), n*t))

	callback.Invoke(js.Null(), A)

	return this
}

func registerCallbacks() {
	js.Global().Set("calculateCompoundInterest", js.FuncOf(calculateCompoundInterest))
}

func main() {
	c := make(chan bool)

	println("WASM Go Initialized")
	// register functions
	registerCallbacks()
	<-c
}

import { lerp } from "../../utils.js"
import Layer from "./Layer.js"

export default class Network {
  constructor({neuronCounts = false, brain = false, mutationRate = 0}) {
    this.layers = []
    if (brain) {
      this.#copyConstructor(brain)

      if (mutationRate) {
        Network.mutate(this, mutationRate)
      }
      return
    }

    this.#createNewNetwork(neuronCounts)
  }

  static feedForward(inputs, network) {
    let outputs = Layer.feedForward(
      inputs, network.layers[0]
    )

    for (let i = 1; i < network.layers.length; i++) {
      outputs = Layer.feedForward(
        outputs,
        network.layers[i]
      )
    }
    return outputs
  }

  #createNewNetwork(neuronCounts) {
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.layers.push(new Layer(
        neuronCounts[i], neuronCounts[i + 1]
      ))
    }
  }

  #copyConstructor(network) {
    this.layers =  JSON.parse(JSON.stringify(network.layers))
  }

  static mutate(network, amount = 1) {
    network.layers.forEach(layer => {
      for (let i = 0; i < layer.biases.length; i++) {
        layer.biases[i] = lerp(
          layer.biases[i],
          Math.random() * 2 - 1,
          amount
        )
      }

      for (let i = 0; i < layer.weights.length; i++) {
        for (let j = 0; j < layer.weights[i].length; j++) {
          layer.weights[i][j] = lerp(
            layer.weights[i][j],
            Math.random() * 2 - 1,
            amount
          )
        }
      }
    })
  }
}
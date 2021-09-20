<script>
  import { onMount, afterUpdate, tick } from 'svelte'
  import * as Plot from '@observablehq/plot'
  import { createTooltip } from '$lib/tooltip.js'

  export let data
  export let x
  export let y
  export let stroke
  export let renderTooltip = true
  export let tooltipContent
  export let tooltipFormatter

  let container
  let plot
  let tooltip

  onMount(async () => {
    await build()
    container.appendChild(plot)
  })

  afterUpdate(async () => {
    container.removeChild(plot)
    await tick()
    await build()
    container.appendChild(plot)
  })

  async function build () {
    if (!tooltip) {
      tooltip = createTooltip(Plot)
    }

    const options = {
      marks: [
        Plot.dot(data, {
          x,
          y,
          stroke
        })
      ],
      marginTop: 30,
      marginBottom: 45
    }

    if (renderTooltip) {
      options.marks.push(tooltip(data, {
        x,
        y,
        stroke: 'black',
        content: tooltipContent,
        formatter: tooltipFormatter,
        onmouseover: (a, b, c, d) => {
          // console.log('onmouseover', a, b, c, d)
        }
      }))
    }

    plot = Plot.plot(options)
  }
</script>

<div
  bind:this={container}
/>

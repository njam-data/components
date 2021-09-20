<script>
  import { onMount, afterUpdate, tick } from 'svelte'

  export let data
  export let columnHeaders = null
  export let barColor = 'steelblue'
  export let barBackgroundColor = '#ffffff'
  export let yValue
  export let width = 600
  export let height = 300
  export let margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 60
  }

  export let formatter

  let chartElement

  onMount(async () => {
    await tick()
    await buildVisualization()
  })

  afterUpdate(async () => {
    console.log('afterUpdate', data)
    await tick()
    await buildVisualization()
  })

  async function buildVisualization () {
    const { select, selectAll } = await import('d3-selection')
    const { scaleLinear, scaleBand } = await import('d3-scale')
    const { axisLeft } = await import('d3-axis')
    const { format } = await import('d3-format')

    if (!formatter) {
      formatter = function (d) {
        return format('.0%')(d)
      }
    }

    const chart = select(chartElement)
    chart.selectAll('g > *').remove()

    const svg = chart
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const x = (d) => {
      return d.value
    }

    const xScale = scaleLinear()

    const y = (d) => {
      return d[yValue]
    }

    const yScale = scaleBand().range([height, 0]).padding(0.1)
    const yAxis = axisLeft(yScale)

    const headers = columnHeaders ? columnHeaders : Object.keys(data[0]).filter((key) => {
      return key !== yValue
    })
    
    const columnScale = scaleBand().domain(headers).range([0, width]).paddingInner(.1)

    const getColumnValue = (d) => {
      return columnScale(d.key)
    }

    const dataByYValueObj = data.reduce((obj, row) => {
      const keys = Object.keys(row)

      for (const key of keys) {
        if (key !== yValue) {
          if (!obj[key]) {
            obj[key] = {}
          }

          obj[key][row[yValue]] = row[key]
        }
      }

      return obj
    }, {})

    const dataByYValue = Object.keys(dataByYValueObj).map((key) => {
      const row = dataByYValueObj[key]

      const value = Object.keys(row).map((rowKey) => {
        const newRow = {}
        newRow[yValue] = rowKey
        newRow.key = key
        newRow.value = row[rowKey]
        return newRow
      })

      return {
        key,
        value
      }
    }).sort((rowA, rowB) => {
      return rowA.value['A few times a day'] < rowB.value['A few times a day']
    })

    const _data = dataByYValue

    yScale.domain(data.map(y).reverse())
    xScale.range([0, columnScale.bandwidth()])

    svg.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
      .style('font-size', '10px')
      .call(g => {
        return g.select('.domain').remove()
      })

    const columns = svg.append('g')
      .attr('class', 'columns')
      .selectAll('.column')
      .data(_data)
      .enter()
        .append('g')
        .attr('class', 'column')
        .attr('transform', (d) => {
          return `translate(${getColumnValue(d)}, 0)`
        })

    columns
      .append('text')
      .attr('class', 'label')
      .style('font-family', 'sans-serif')
      .style('font-size', '10px')
      .attr('dy', '-0.3em')
      .text((d) => {
        return d.key
      })

    const bars = columns.append('g').attr('class', 'bars')

    bars.selectAll('.bar-background')
      .data((d) => {
        return d.value
      })
      .enter()
      .append('rect')
      .attr('class', 'bar bar-background')
      .style('fill', barBackgroundColor)
      .attr('x', 0)
      .attr('y', (d) => {
        return yScale(y(d))
      })
      .attr('width', xScale.range()[1])
      .attr('height', yScale.bandwidth())

    bars.selectAll('.bar-value')
      .data((d, i) => {
        return d.value
      })
      .enter()
      .append('rect')
      .attr('class', 'bar bar-value')
      .attr('x', 0)
      .attr('y', (d) => {
        return yScale(y(d))
      })
      .attr('width', (d) => {
        return xScale(x(d))
      })
      .attr('height', yScale.bandwidth())
      .style('fill', barColor)

    function positionLabel (d) {
      const val = xScale(x(d))
      const xMax = xScale.range()[1]

      if (val < (0.25 * xMax)) {
        select(this)
          .attr('style', 'fill: black;')
          .attr('x', val)
          .attr('dx', 4)
      } else {
        select(this)
          .attr('style', 'fill: white;')
          .attr('x', 0)
          .attr('dx', 6)
      }

      select(this)
        .attr('y', yScale(y(d)) + (yScale.bandwidth() / 2))
        .attr('dy', '0.3em')
    }

    columns.append('g')
      .attr('class', 'labels')
      .selectAll('.label')
      .data((d) => {
        return d.value
      })
      .enter()
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12')
      .attr('class', 'label')
      .text((d) => {
        return formatter(x(d))
      })
      .each(positionLabel)
  }
</script>

<svg
  bind:this={chartElement}
  width="{width + margin.left + margin.right}"
  height="{height + margin.top + margin.bottom}"
/>

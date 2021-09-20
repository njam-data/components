<script>
  import BarChartTable from '$lib/BarChartTable.svelte'
  import Scatterplot from '$lib/Scatterplot.svelte'

  const data1 = [
    {
      "example": "Example 1",
      "A": .5,
      "B": .2,
      "C": .3
    },
    {
      "example": "Example 2",
      "A": .1,
      "B": .3,
      "C": .2
    },
    {
      "example": "Example 3",
      "A": .2,
      "B": .8,
      "C": .1
    }
  ]

  const anotherData = [
    {
      "example": "Example A",
      "A": .3,
      "B": .2,
      "C": .5
    },
    {
      "example": "Example B",
      "A": .2,
      "B": .1,
      "C": .5
    },
    {
      "example": "Example C",
      "A": .1,
      "B": .5,
      "C": .4
    }
  ]

  const data2 = data1

  let selection = data1

  function selectData () {
    if (selection === data1) {
      selection = anotherData
    } else {
      selection = data1
    }
  }
</script>

<button on:click={selectData}>Toggle dataset</button>

<Scatterplot
  data={selection}
  x='A'
  y='B'
  stroke='C'
  tooltipContent={(d) => {
    return `${d.example}\nA: ${d.A}\nB: ${d.B}\nC: ${d.C}`
  }}
/>

<BarChartTable
  data={selection}
  width={400}
  height={150}
  yValue={'example'}
  barBackgroundColor={'#efefef'}
  margin={{
    top: 20,
    right: 0,
    bottom: 0,
    left: 65
  }}
/>

<BarChartTable
  data={data2}
  width={400}
  height={150}
  yValue={'example'}
  barBackgroundColor={'#efefef'}
  margin={{
    top: 20,
    right: 0,
    bottom: 0,
    left: 65
  }}
/>

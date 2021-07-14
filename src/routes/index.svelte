<script>
  import BarChartTable from '@njam-data/components/BarChartTable.svelte'

  const data = [
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
</script>

<BarChartTable
  {data}
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

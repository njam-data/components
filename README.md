# @njam-data/components
> Reusable svelte components for data projects

## Usage

```html
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
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Potential components
- scrollytelling https://svelte.dev/repl/3d3736e634c9404ea8ec2ef7b87e2053?version=3.42.4

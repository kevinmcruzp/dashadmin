import {
  Box,
  SimpleGrid,
  Text,
  theme
} from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

export default function Dashboard () {
  const userRegisterOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray[400]
    },
    grid: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: [
        '2021-03-18T00:00:00.000Z',
        '2021-03-19T00:00:00.000Z',
        '2021-03-20T00:00:00.000Z',
        '2021-03-21T00:00:00.000Z',
        '2021-03-22T00:00:00.000Z',
        '2021-03-23T00:00:00.000Z',
        '2021-03-24T00:00:00.000Z'
      ]
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  }
  const userRegisterSeries = [{ name: 'series1', data: [14, 12, 2, 12, 2, 4, 5] }]

  const inscribedOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray[400]
    },
    grid: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'category',
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories:
      [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Agosto'

      ]
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    },
    colors: [theme.colors.pink[500]]
  }
  const inscribedSeries = [{ name: 'series2', data: [15, 12, 1, 2, 7, 4, 2] }]

  const totalUserOption: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray[400]
    },
    labels: ['Hombres', 'Mujeres'],
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0
    }
  }
  const totalUserSeries = [24, 35]

  return (
    <Box
      flex='1'
    >
      <SimpleGrid
        h='100%'
        w='100%'
        overflow='auto'
        gap='4'
        minChildWidth='420px'
        alignContent='flex-start'
      >
        <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
          <Text fontSize='lg' mb='4'>
            Usuarios registrados
          </Text>
          <Chart
            options={userRegisterOptions}
            series={userRegisterSeries}
            type='area'
          />
        </Box>

        <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
          <Text fontSize='lg' mb='4'>
            Inscritos por mes
          </Text>
          <Chart
            options={inscribedOptions}
            series={inscribedSeries}
            type='bar'
          />
        </Box>

        <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
          <Text fontSize='lg' mb='4'>
            Mujeres x Hombres
          </Text>
          <Chart
            options={totalUserOption}
            series={totalUserSeries}
            type='pie'
          />
        </Box>

      </SimpleGrid>
    </Box>
  )
}

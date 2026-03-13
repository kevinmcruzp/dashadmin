import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  Avatar,
  HStack,
  VStack,
  theme as chakraTheme
} from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ElementType } from 'react'
import {
  RiUserLine,
  RiUserAddLine,
  RiMoneyDollarCircleLine,
  RiPercentLine
} from 'react-icons/ri'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: ElementType
  accent: string
}

function StatCard ({ title, value, change, icon, accent }: StatCardProps) {
  const isPositive = change >= 0
  return (
    <Box
      bg='gray.800'
      borderRadius={12}
      p={6}
      position='relative'
      overflow='hidden'
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        h: '3px',
        bgGradient: `linear(to-r, ${accent}, transparent)`
      }}
    >
      <Flex justify='space-between' align='flex-start'>
        <VStack align='flex-start' spacing={1}>
          <Text fontSize='sm' color='gray.400' fontWeight='medium'>
            {title}
          </Text>
          <Text fontSize='2xl' fontWeight='bold' color='white' lineHeight='1.2'>
            {value}
          </Text>
        </VStack>
        <Flex
          w={10}
          h={10}
          borderRadius='full'
          align='center'
          justify='center'
          bg={`${accent}22`}
          flexShrink={0}
        >
          <Icon as={icon} color={accent} boxSize={5} />
        </Flex>
      </Flex>
      <Stat mt={4}>
        <StatHelpText mb={0} color={isPositive ? 'green.400' : 'red.400'}>
          <StatArrow type={isPositive ? 'increase' : 'decrease'} />
          {Math.abs(change)}% em relação ao mês anterior
        </StatHelpText>
      </Stat>
    </Box>
  )
}

const recentUsers = [
  { name: 'Ana García', email: 'ana@email.com', date: '10 Mar 2026', status: 'Ativo' },
  { name: 'Carlos Silva', email: 'carlos@email.com', date: '09 Mar 2026', status: 'Ativo' },
  { name: 'María López', email: 'maria@email.com', date: '08 Mar 2026', status: 'Pendente' },
  { name: 'João Costa', email: 'joao@email.com', date: '07 Mar 2026', status: 'Ativo' },
  { name: 'Lucía Martín', email: 'lucia@email.com', date: '06 Mar 2026', status: 'Inativo' }
]

export default function Dashboard () {
  const commonChart: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: chakraTheme.colors.gray[400],
      fontFamily: 'Roboto, sans-serif'
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: { fontFamily: 'Roboto, sans-serif' }
    },
    grid: {
      borderColor: '#353646',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    }
  }

  const userRegisterOptions: ApexOptions = {
    ...commonChart,
    chart: {
      ...commonChart.chart,
      type: 'area',
      sparkline: { enabled: false }
    },
    colors: ['#805AD5'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        opacityFrom: 0.5,
        opacityTo: 0.05
      }
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      type: 'datetime',
      axisBorder: { color: '#353646' },
      axisTicks: { color: '#353646' },
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
    dataLabels: { enabled: false },
    markers: { size: 4, colors: ['#805AD5'], strokeWidth: 0 }
  }
  const userRegisterSeries = [{ name: 'Usuários', data: [14, 12, 2, 12, 2, 4, 5] }]

  const inscribedOptions: ApexOptions = {
    ...commonChart,
    chart: { ...commonChart.chart, type: 'bar' },
    colors: ['#D53F8C'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        opacityFrom: 0.9,
        opacityTo: 0.5
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '55%'
      }
    },
    xaxis: {
      type: 'category',
      axisBorder: { color: '#353646' },
      axisTicks: { color: '#353646' },
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Ago']
    },
    dataLabels: { enabled: false }
  }
  const inscribedSeries = [{ name: 'Inscritos', data: [15, 12, 1, 2, 7, 4, 2] }]

  const totalUserOption: ApexOptions = {
    ...commonChart,
    chart: { ...commonChart.chart, type: 'donut' },
    labels: ['Hombres', 'Mujeres'],
    colors: ['#4299E1', '#D53F8C'],
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: chakraTheme.colors.gray[400],
              formatter: (w) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString()
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',
      labels: { colors: chakraTheme.colors.gray[400] }
    },
    dataLabels: { enabled: false }
  }
  const totalUserSeries = [24, 35]

  return (
    <Box
      flex='1'
      overflow='auto'
      p={['4', '6']}
      __css={{
        '&::-webkit-scrollbar': { w: '2' },
        '&::-webkit-scrollbar-track': { w: '6' },
        '&::-webkit-scrollbar-thumb': { borderRadius: '10', bg: '#4A5568' }
      }}
    >
      {/* Page Header */}
      <Box mb={6}>
        <Text fontSize='2xl' fontWeight='bold' color='white'>
          Dashboard
        </Text>
        <Text fontSize='sm' color='gray.400' mt={1}>
          Visão geral das métricas e atividades
        </Text>
      </Box>

      {/* KPI Cards */}
      <SimpleGrid columns={[1, 2, 4]} gap={4} mb={6}>
        <StatCard
          title='Total de Usuários'
          value='12.453'
          change={12.5}
          icon={RiUserLine}
          accent='#805AD5'
        />
        <StatCard
          title='Novos Usuários'
          value='1.243'
          change={8.2}
          icon={RiUserAddLine}
          accent='#D53F8C'
        />
        <StatCard
          title='Receita Mensal'
          value='R$ 48.250'
          change={-3.1}
          icon={RiMoneyDollarCircleLine}
          accent='#38A169'
        />
        <StatCard
          title='Taxa de Conversão'
          value='3,24%'
          change={5.7}
          icon={RiPercentLine}
          accent='#DD6B20'
        />
      </SimpleGrid>

      {/* Charts Row */}
      <Grid
        templateColumns={['1fr', '1fr', '1fr 1fr', '2fr 1fr']}
        gap={4}
        mb={4}
      >
        {/* Area Chart */}
        <GridItem>
          <Box bg='gray.800' borderRadius={12} p={6} h='100%'>
            <Flex justify='space-between' align='center' mb={4}>
              <VStack align='flex-start' spacing={0}>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  Usuários Registrados
                </Text>
                <Text fontSize='xs' color='gray.400'>
                  Últimos 7 dias
                </Text>
              </VStack>
              <Badge
                colorScheme='purple'
                borderRadius='full'
                px={3}
                py={1}
                fontSize='xs'
              >
                +14 hoje
              </Badge>
            </Flex>
            <Chart
              options={userRegisterOptions}
              series={userRegisterSeries}
              type='area'
              height={220}
              width='100%'
            />
          </Box>
        </GridItem>

        {/* Donut Chart */}
        <GridItem>
          <Box bg='gray.800' borderRadius={12} p={6} h='100%'>
            <VStack align='flex-start' spacing={0} mb={4}>
              <Text fontSize='md' fontWeight='semibold' color='white'>
                Distribuição por Gênero
              </Text>
              <Text fontSize='xs' color='gray.400'>
                Total de usuários ativos
              </Text>
            </VStack>
            <Chart
              options={totalUserOption}
              series={totalUserSeries}
              type='donut'
              height={220}
              width='100%'
            />
          </Box>
        </GridItem>
      </Grid>

      {/* Bar Chart + Recent Users */}
      <Grid
        templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        gap={4}
      >
        {/* Bar Chart */}
        <GridItem>
          <Box bg='gray.800' borderRadius={12} p={6}>
            <Flex justify='space-between' align='center' mb={4}>
              <VStack align='flex-start' spacing={0}>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  Inscritos por Mês
                </Text>
                <Text fontSize='xs' color='gray.400'>
                  Ano corrente
                </Text>
              </VStack>
              <Badge
                colorScheme='pink'
                borderRadius='full'
                px={3}
                py={1}
                fontSize='xs'
              >
                2026
              </Badge>
            </Flex>
            <Chart
              options={inscribedOptions}
              series={inscribedSeries}
              type='bar'
              height={220}
            />
          </Box>
        </GridItem>

        {/* Recent Users Table */}
        <GridItem>
          <Box bg='gray.800' borderRadius={12} p={6}>
            <Flex justify='space-between' align='center' mb={4}>
              <Text fontSize='md' fontWeight='semibold' color='white'>
                Usuários Recentes
              </Text>
              <Text fontSize='xs' color='purple.400' cursor='pointer' _hover={{ color: 'purple.300' }}>
                Ver todos
              </Text>
            </Flex>
            <Table size='sm' variant='unstyled'>
              <Thead>
                <Tr>
                  <Th color='gray.500' fontSize='xs' fontWeight='medium' pb={3}>
                    Usuário
                  </Th>
                  <Th color='gray.500' fontSize='xs' fontWeight='medium' pb={3} isNumeric>
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentUsers.map((user, i) => (
                  <Tr key={i} _hover={{ bg: 'gray.750' }}>
                    <Td py={3} px={0}>
                      <HStack spacing={3}>
                        <Avatar size='sm' name={user.name} bg='purple.600' />
                        <VStack align='flex-start' spacing={0}>
                          <Text fontSize='sm' fontWeight='medium' color='white'>
                            {user.name}
                          </Text>
                          <Text fontSize='xs' color='gray.400'>
                            {user.date}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td py={3} px={0} isNumeric>
                      <Badge
                        borderRadius='full'
                        px={2}
                        py={0.5}
                        fontSize='xs'
                        colorScheme={
                          user.status === 'Ativo'
                            ? 'green'
                            : user.status === 'Pendente'
                              ? 'yellow'
                              : 'red'
                        }
                      >
                        {user.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'
import { api } from '../../services/api'
import { useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

export default function UserList () {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser (userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10 // 10 minutes
      }
    )
  }

  return (
    <Box width='100%' borderRadius={8} bg='gray.800' p='8' overflowY='auto'>
      <Flex mb='8' justify='space-between' align='center'>
        <Heading size='lg' fontWeight='normal'>
          Usuarios
          {!isLoading && isFetching && (
            <Spinner size='sm' color='gray.500' ml='4' />
          )}
        </Heading>

        <NextLink href='/users/create' passHref>
          <Button
            as='a'
            size='sm'
            bg='pink.500'
            leftIcon={<Icon as={RiAddLine} />}
            _hover={{ opacity: 0.9 }}
          >
            Criar novo
          </Button>
        </NextLink>
      </Flex>

      {isLoading
        ? (
          <Flex justify='center'>
            <Spinner />
          </Flex>
          )
        : error
          ? (
            <Table colorScheme='whiteAlpha'>
              <Thead>
                <Tr>
                  <Th px={['4', '4', '6']} color='gray.300' width='8'>
                    <Checkbox colorScheme='pink' />
                  </Th>
                  <Th>Usuário</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  <Th width='8' />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme='pink' />
                  </Td>
                  <Td>
                    <Box>
                      <Link color='purple.400'>
                        <Text fontWeight='bold'>Kevin Cruz</Text>
                      </Link>
                      <Text fontSize='sm' color='gray.300'>
                        kevin@email.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>25 feb 96</Td>}
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      colorScheme='purple'
                      leftIcon={<Icon as={RiPencilLine} fontSize='17' />}
                      cursor='pointer'
                    >
                      {isWideVersion ? 'Editar' : ''}
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme='pink' />
                  </Td>
                  <Td>
                    <Box>
                      <Link color='purple.400'>
                        <Text fontWeight='bold'>Kevin Cruz</Text>
                      </Link>
                      <Text fontSize='sm' color='gray.300'>
                        kevin@email.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>25 feb 96</Td>}
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      colorScheme='purple'
                      leftIcon={<Icon as={RiPencilLine} fontSize='17' />}
                      cursor='pointer'
                    >
                      {isWideVersion ? 'Editar' : ''}
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme='pink' />
                  </Td>
                  <Td>
                    <Box>
                      <Link color='purple.400'>
                        <Text fontWeight='bold'>Kevin Cruz</Text>
                      </Link>
                      <Text fontSize='sm' color='gray.300'>
                        kevin@email.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>25 feb 96</Td>}
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      colorScheme='purple'
                      leftIcon={<Icon as={RiPencilLine} fontSize='17' />}
                      cursor='pointer'
                    >
                      {isWideVersion ? 'Editar' : ''}
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            )
          : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' width='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width='8' />
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users?.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme='pink' />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color='purple.400'
                              onMouseEnter={() => {
                                handlePrefetchUser(user.id)
                              }}
                            >
                              <Text fontWeight='bold'>{user.name}</Text>
                            </Link>
                            <Text fontSize='sm' color='gray.300'>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          <Button
                            as='a'
                            size='sm'
                            colorScheme='purple'
                            leftIcon={<Icon as={RiPencilLine} fontSize='17' />}
                            cursor='pointer'
                          >
                            {isWideVersion ? 'Editar' : ''}
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
            )}
    </Box>
  )
}

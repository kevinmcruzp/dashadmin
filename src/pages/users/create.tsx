import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Form/Input'

import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup
  .object({
    name: yup
      .string()
      .min(4, 'Nome deve conter no minímo 4 caracteres')
      .required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(6, 'Mínimo 6 caracteres'),
    password_confirmation: yup
      .string()
      .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
  })
  .required()

export default function CreateUser () {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', {
        user: {
          ...user,
          created_at: new Date()
        }
      })
      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
      }
    }
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box
      as='form'
      width='90%'
      height='400px'
      borderRadius={8}
      bg='gray.800'
      p={['6', '8']}
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <Heading size='lg' fontWeight='normal'>
        Criar usuário
      </Heading>

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8'>
        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
          <Input
            idName='name'
            label='Nome completo'
            {...register('name')}
            error={errors.name}
          />
          <Input
            idName='email'
            type='email'
            label='E-mail'
            {...register('email')}
            error={errors.email}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
          <Input
            idName='password'
            type='password'
            label='Senha'
            {...register('password')}
            error={errors.password}
          />
          <Input
            idName='password_confirmation'
            type='password'
            label='Confirmação da senha'
            {...register('password_confirmation')}
            error={errors.password_confirmation}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt='8' justify='flex-end'>
        <HStack spacing='4'>
          <Link href='/users' passHref>
            <Button as='a' colorScheme='whiteAlpha' color='white'>
              Cancelar
            </Button>
          </Link>
          <Button
            type='submit'
            bg='pink.600'
            _hover={{ opacity: 0.8 }}
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}

import { Button, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Routes from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../components/Form/Input'
import { GetServerSideProps } from 'next'

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = yup
  .object({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
  })
  .required()

export default function SignIn () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) })

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    Routes.push('/dashboard')
  }

  return (
    <Flex w='100vw' h='100vh' alignItems='center' justifyContent='center'>
      <Flex
        as='form'
        w='100%'
        maxW={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            idName='email'
            type='email'
            label='Email'
            {...register('email')}
            error={errors.email}
          />
          <Input
            idName='password'
            type='password'
            label='Password'
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          bg='pink.500'
          _hover={{
            bgColor: 'pink.400'
          }}
          size='lg'
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
    redirect: {
      destination: '/dashboard'
    }
  }
}

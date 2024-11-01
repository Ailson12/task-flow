import { Text } from '@/components/Text'
import { colors } from '@/styles/colors'
import { FC, useMemo } from 'react'
import * as S from './styles'
import { generateUUID } from '@/helpers/generate-uuid'

export const Board: FC = () => {
  const data = useMemo(
    () => [
      {
        id: generateUUID(),
        status: {
          title: 'TODO',
          color: '#49c1e5',
        },
        tasks: [
          {
            title:
              'Criar uma interface de utilizador para o fluxo de integração',
          },
          {
            title: 'Construir interface de utilizador para pesquisa',
          },
          {
            title: 'Criar a interface do utilizador para as definições',
          },
          {
            title: 'QA e teste de todos os principais percursos do utilizador',
          },
        ],
      },
      {
        id: generateUUID(),
        status: {
          title: 'DOING',
          color: '#8470f7',
        },
        tasks: [
          {
            title: 'Conceber definições e páginas de pesquisa',
          },
          {
            title: 'Adicionar pontos finais de gestão de contas',
          },
          {
            title: 'Conceber o fluxo de integração',
          },
          {
            title: 'Adicionar pontos finais de pesquisa',
          },
          {
            title: 'Adicionar pontos finais de autenticação',
          },
          {
            title:
              'Pesquisar os preços de vários concorrentes e experimentar diferentes modelos de negócio',
          },
          {
            title: 'Adicionar pontos finais de autenticação - 02',
          },
          {
            title:
              'Pesquisar os preços de vários concorrentes e experimentar diferentes modelos de negócio - 02',
          },
        ],
      },
      {
        id: generateUUID(),
        status: {
          title: 'TODO',
          color: '#49c1e5',
        },
        tasks: [
          {
            title:
              'Criar uma interface de utilizador para o fluxo de integração',
          },
          {
            title: 'Construir interface de utilizador para pesquisa',
          },
          {
            title: 'Criar a interface do utilizador para as definições',
          },
          {
            title: 'QA e teste de todos os principais percursos do utilizador',
          },
        ],
      },
      {
        id: generateUUID(),
        status: {
          title: 'TODO',
          color: '#49c1e5',
        },
        tasks: [
          {
            title:
              'Criar uma interface de utilizador para o fluxo de integração',
          },
          {
            title: 'Construir interface de utilizador para pesquisa',
          },
          {
            title: 'Criar a interface do utilizador para as definições',
          },
          {
            title: 'QA e teste de todos os principais percursos do utilizador',
          },
        ],
      },
      {
        id: generateUUID(),
        status: {
          title: 'TODO',
          color: '#49c1e5',
        },
        tasks: [
          {
            title:
              'Criar uma interface de utilizador para o fluxo de integração',
          },
          {
            title: 'Construir interface de utilizador para pesquisa',
          },
          {
            title: 'Criar a interface do utilizador para as definições',
          },
          {
            title: 'QA e teste de todos os principais percursos do utilizador',
          },
        ],
      },
    ],
    []
  )

  return (
    <S.Wrapper>
      <S.Container>
        {data.map((row) => (
          <div key={row.id}>
            <S.StatusContainer>
              <S.StatusIndicator $bgColor={row.status.color} />
              <Text size={14} color={colors.c2} weight={500} letterSpacing={1}>
                {row.status.title} ({row.tasks.length})
              </Text>
            </S.StatusContainer>

            <S.TaskContainer>
              {row.tasks.map((task) => (
                <S.Card key={task.title}>
                  <Text weight={500} size={14}>
                    {task.title}
                  </Text>
                </S.Card>
              ))}
            </S.TaskContainer>
          </div>
        ))}
      </S.Container>
    </S.Wrapper>
  )
}

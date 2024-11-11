import { FC } from 'react'
import * as S from './styles'
import { Text } from '@/components/Text'
import { colors } from '@/styles/colors'
import { useBoard } from './hooks/useBoard'

export const Board: FC = () => {
  const { tasksFormatted } = useBoard()

  return (
    <S.Wrapper>
      <S.Container>
        {tasksFormatted.map((row) => (
          <div key={row.id}>
            <S.StatusContainer>
              <S.StatusIndicator $bgColor={row.color} />
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

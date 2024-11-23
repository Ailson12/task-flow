import { FC } from 'react'
import * as S from './styles'
import { Text } from '@/components/Text'
import { colors } from '@/styles/colors'
import { useBoard } from './hooks/useBoard'
import { AddNewTask } from '@/components/NavBar/components/AddNewTask'
import { Dropdown } from '@/components/Dropdown'
import { DialogConfirm } from '@/components/DialogConfirm'

export const Board: FC = () => {
  const {
    taskOpen,
    tasksFormatted,
    removeTaskSelected,
    taskSelectedRemoved,
    setTaskSelectedRemoved,
  } = useBoard()

  return (
    <>
      <S.Wrapper>
        <S.Container>
          {tasksFormatted.map((row) => (
            <div key={row.id}>
              <S.StatusContainer>
                <S.StatusIndicator $bgColor={row.color} />
                <Text
                  size={14}
                  color={colors.c2}
                  weight={500}
                  letterSpacing={1}
                >
                  {row.status.title} ({row.tasks.length})
                </Text>
              </S.StatusContainer>

              <S.TaskContainer>
                {row.tasks.map((task) => {
                  const title = task.title.slice(0, 60)
                  const hasSuffix = task.title.length > 60

                  return (
                    <S.Card key={task.title}>
                      <Text weight={500} size={14}>
                        {`${title}${hasSuffix ? '...' : ''}`}
                      </Text>
                      <Dropdown
                        wrapperProps={{
                          style: {
                            alignSelf: 'flex-start',
                          },
                        }}
                        items={[
                          {
                            key: 'board-trash',
                            label: 'Excluir',
                            onClick() {
                              setTaskSelectedRemoved(task)
                            },
                          },
                          {
                            key: 'board-edit',
                            label: 'Editar',
                            onClick() {
                              // boardOpen.onChange(true)
                            },
                          },
                        ]}
                      />
                    </S.Card>
                  )
                })}
              </S.TaskContainer>
            </div>
          ))}
        </S.Container>
      </S.Wrapper>

      <DialogConfirm
        onConfirm={removeTaskSelected}
        open={Boolean(taskSelectedRemoved)}
        onClose={() => setTaskSelectedRemoved(null)}
      />

      {taskOpen.value && (
        <AddNewTask
          open={taskOpen.value}
          onClose={() => taskOpen.onChange(false)}
        />
      )}
    </>
  )
}

import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { setupWithDefaultProvider } from '@/helpers/setup-render'
import { toast } from 'react-toastify'
import { useBoardFormDialog } from './useBoardFormDialog'

const setupRenderHook = () => {
  return renderHook(useBoardFormDialog, {
    wrapper: ({ children }) => setupWithDefaultProvider(children),
  })
}

describe('useBoardFormDialog', () => {
  it('should list the activity statuses', async () => {
    const { result } = setupRenderHook()

    await waitFor(() => {
      expect(result.current.taskStatus.options).toHaveLength(2)
    })
  })

  it('should start the selected statuses empty', () => {
    const { result } = setupRenderHook()
    expect(result.current.taskStatus.taskStatusSelected).toHaveLength(0)
  })

  it('should select an option and add it to the list of selected statuses', async () => {
    const { result } = setupRenderHook()

    await waitFor(() => {
      expect(result.current.taskStatus.options).toHaveLength(2)
    })

    const firstOption = result.current.taskStatus.options[0]

    await waitFor(() => result.current.taskStatus.onChange(+firstOption.value))

    await waitFor(result.current.taskStatus.addTaskStatus)
    expect(result.current.taskStatus.taskStatusSelected).toHaveLength(1)
  })

  it("should alert you when you try to add the status but haven't selected the status option", async () => {
    const { result } = setupRenderHook()

    const toastMock = vi.spyOn(toast, 'warn')
    result.current.taskStatus.addTaskStatus()

    expect(toastMock).toHaveBeenCalledTimes(1)
    expect(toastMock).toHaveBeenCalledWith('selecione um status')
    expect(result.current.taskStatus.taskStatusSelected).toHaveLength(0)

    toastMock.mockClear()
  })

  it('should be able to remove an activity status that has been added', async () => {
    const { result } = setupRenderHook()

    await waitFor(() => {
      expect(result.current.taskStatus.options).toHaveLength(2)
    })

    const firstOption = result.current.taskStatus.options[0]

    await waitFor(() => result.current.taskStatus.onChange(+firstOption.value))

    await waitFor(result.current.taskStatus.addTaskStatus)

    expect(result.current.taskStatus.taskStatusSelected).toHaveLength(1)

    await waitFor(() =>
      result.current.taskStatus.removeTaskStatus(+firstOption.value)
    )
    expect(result.current.taskStatus.taskStatusSelected).toHaveLength(0)
  })

  it('should generate a list of fields that do not meet validation', async () => {
    const { result } = setupRenderHook()
    result.current.formik.submitForm()

    await waitFor(() => {
      const { errors } = result.current.formik
      const errorsLength = Object.keys(errors).length
      expect(errorsLength).toBeGreaterThan(0)
    })
  })
})

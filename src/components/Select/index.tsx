import * as S from './styles'
import { SelectWrapper } from './styles'
import { FC, SelectHTMLAttributes, useEffect, useMemo } from 'react'

export type OptionSelectType = {
  value: string | number
  label: string
}

export type SelectProps = {
  label?: string
  errorMessage?: string
  options: OptionSelectType[]
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select: FC<SelectProps> = ({
  label,
  selectProps,
  errorMessage,
  options = [],
}) => {
  const hasErrorMessage = (errorMessage ?? '').trim().length > 0

  const getUniqueOptions = () => {
    const values: string[] = []
    options.forEach(({ value }) => {
      const valueParsed = value.toString()
      if (!values.includes(valueParsed)) {
        values.push(valueParsed)
      }
    })

    return values
  }

  const optionsIsDuplicated = useMemo(() => {
    const uniqueOptions = getUniqueOptions()
    const isEqual = uniqueOptions.length === options.length
    return !isEqual
  }, [options])

  useEffect(() => {
    if (optionsIsDuplicated) {
      console.error('duplicate options')
    }
  }, [options, optionsIsDuplicated])

  const finalOptions = optionsIsDuplicated ? [] : options

  return (
    <div className="w-100">
      <S.Label>
        {label}
        <SelectWrapper {...selectProps}>
          <option value="">Selecione...</option>
          {finalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectWrapper>

        <S.ErrorMessage
          $isVisible={hasErrorMessage}
          aria-hidden={!hasErrorMessage}
        >
          {errorMessage}
        </S.ErrorMessage>
      </S.Label>
    </div>
  )
}

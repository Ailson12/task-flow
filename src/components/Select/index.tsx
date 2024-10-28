import { FC, SelectHTMLAttributes, useEffect, useMemo } from 'react'
import { SelectWrapper } from './styles'
import * as S from './styles'

export type OptionSelectType = {
  value: string | number
  label: string
}

export type SelectProps = {
  label?: string
  options: OptionSelectType[]
  selectOptions?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select: FC<SelectProps> = ({
  label,
  selectOptions,
  options = [],
}) => {
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
  }, [optionsIsDuplicated])

  const finalOptions = optionsIsDuplicated ? [] : options

  return (
    <div className="w-100">
      <S.Label>
        {label}
        <SelectWrapper {...selectOptions}>
          <option value="">Selecione...</option>
          {finalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectWrapper>
      </S.Label>
    </div>
  )
}

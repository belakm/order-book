import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'

import styles from '../../style'

interface DropdownValue<T> {
  key: T
  text: string
}

interface DropdownProps<T> {
  initialValue?: T
  options: DropdownValue<T>[]
  onChange: (key: T) => void
  testID?: string
}

/**
 * A dropdown component.
 */
const Dropdown = <T,>({
  options,
  onChange,
  initialValue,
  testID,
}: DropdownProps<T>) => {
  const [selected, setSelected] = useState<DropdownValue<T> | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    if (selected != null) {
      onChange(selected.key)
    }
    setIsOpen(false)
  }, [selected])
  useEffect(() => {
    if (selected == null) {
      setSelected(options.find((o) => o.key === initialValue) || null)
    }
  }, [initialValue])
  return (
    <View testID={testID}>
      <Pressable
        testID={`${testID}_pressable`}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={[styles.flexRow, styles.material, styles.materialPadding]}>
          <Text style={[styles.text]} testID={`${testID}_textvalue`}>
            {selected ? selected.text : 'Select'}
          </Text>
          <Text style={[styles.text, { marginLeft: 12 }]}>
            {isOpen ? '▴' : '▾'}
          </Text>
        </View>
      </Pressable>
      {isOpen && (
        <View
          style={[styles.dropdownOptions, styles.material]}
          testID={`${testID}_dropbox`}
        >
          {options.map(({ key, text }, index) =>
            key === selected?.key ? null : (
              <Text
                testID={`${testID}_options_${index}`}
                key={index}
                style={[styles.text, styles.materialPadding]}
                onPress={() => {
                  setSelected({ text, key })
                }}
              >
                {text}
              </Text>
            )
          )}
        </View>
      )}
    </View>
  )
}

export default Dropdown

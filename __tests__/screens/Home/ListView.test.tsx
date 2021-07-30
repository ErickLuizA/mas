import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'

import ListView from '../../../src/screens/Home/ListView'

describe('Home ListView component', () => {
  it('should render with given name props', () => {
    const { getByText } = render(
      <ListView
        name="name"
        data={[]}
        renderItem={(item) => <Text>{item.item}</Text>}
      />,
    )

    expect(getByText('name')).not.toBeNull()
  })

  it('should render items with given data', () => {
    const { getByText } = render(
      <ListView
        name="name"
        data={[
          { id: 1, name: 'hello' },
          { id: 2, name: 'helloo' },
        ]}
        renderItem={(item) => <Text>{item.item.name}</Text>}
      />,
    )

    expect(getByText('hello')).not.toBeNull()
    expect(getByText('helloo')).not.toBeNull()
  })
})

import React from 'react'
import { render } from '@testing-library/react-native'

import Stars from '../../src/components/Stars'

jest.mock('@expo/vector-icons', () => ({ MaterialIcons: 'MaterialIcons' }))

describe('Stars component', () => {
  it('should render 5 stars and no half star if vote_average is 10', () => {
    const { queryAllByTestId } = render(<Stars vote_average={10} />)

    expect(queryAllByTestId('Stars_star_test')).toHaveLength(5)
    expect(queryAllByTestId('Stars_half_star_test')).toHaveLength(0)
  })

  it('should render 4 stars and 1 half star if vote_average is 9', () => {
    const { queryAllByTestId } = render(<Stars vote_average={9} />)

    expect(queryAllByTestId('Stars_star_test')).toHaveLength(4)
    expect(queryAllByTestId('Stars_half_star_test')).toHaveLength(1)
  })

  it('should render 1 stars and 1 half star if vote_average is 3', () => {
    const { queryAllByTestId } = render(<Stars vote_average={3} />)

    expect(queryAllByTestId('Stars_star_test')).toHaveLength(1)
    expect(queryAllByTestId('Stars_half_star_test')).toHaveLength(1)
  })

  it('should render nothing if vote_average is 0', () => {
    const { queryAllByTestId } = render(<Stars vote_average={0} />)

    expect(queryAllByTestId('Stars_star_test')).toHaveLength(0)
    expect(queryAllByTestId('Stars_half_star_test')).toHaveLength(0)
  })
})

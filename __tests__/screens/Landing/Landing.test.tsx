import { render } from '@testing-library/react-native'

import { Screen } from '../../testUtils/renderMainNavigation'

describe('Landing Screen', () => {
  it('should render landing screen correctly', async () => {
    const { getByText } = render(Screen('Landing'))

    expect(getByText('GET STARTED')).not.toBeNull()
  })
})

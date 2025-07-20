import { render, screen } from '@testing-library/react'
import Avatar from '../../components/atoms/Avatar'

describe('Avatar', () => {
    it('renders the prop: initial', () => {
        render(<Avatar initial="A" />)
        expect(screen.getByText('A')).toBeInTheDocument()
    })
})
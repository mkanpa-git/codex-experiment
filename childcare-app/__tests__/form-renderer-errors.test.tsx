import { render, screen, fireEvent } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import TextField from '../components/fields/TextField'
import mapZodErrors from '../utils/mapZodErrors'

describe('Form error display', () => {
  function TestForm() {
    const schema = z.object({ name: z.string().nonempty('Required') })
    const methods = useForm({
      resolver: async values => {
        try {
          const data = schema.parse(values)
          return { values: data, errors: {} }
        } catch (e: any) {
          return { values: {}, errors: mapZodErrors(e.formErrors.fieldErrors) }
        }
      }
    })
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <TextField id="name" label="Name" required />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    )
  }

  it('shows validation message on submit', async () => {
    render(<TestForm />)
    fireEvent.click(screen.getByText('Submit'))
    expect(await screen.findByText('Required')).toBeInTheDocument()
  })
})

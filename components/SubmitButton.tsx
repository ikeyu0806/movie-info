import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  onClick: VoidFunction
  disabled: boolean
}

const SubmitButton = ({ onClick, disabled }: Props): JSX.Element => {
  return (
    <div className="control">
      <button className="button is-link"
              onClick={onClick}
              disabled={disabled}>送信</button>
    </div>
  )
}
export default SubmitButton

import { useState } from 'react'

export const TestWrapper = ({title, message, onContinue, children}) => {
  const [closed, setClosed] = useState(true)

  const onClickTitle = () => {
    setClosed((previous) => !previous)
  }

  return (
    <section className="form form-border">
      <section className="title closable" onClick={onClickTitle}>
        {title}
      </section>
      {!closed && (
        <section className="content">
          {message ? (
            <section className="message" onClick={onContinue}>{message}</section>
          ) : (
            <section>{children}</section>
          )}
        </section>
      )}
    </section>
  );
}
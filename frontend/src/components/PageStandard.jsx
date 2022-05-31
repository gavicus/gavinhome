import './PageStandard.css'

export const PageStandard = ({title, children}) => {
  return (
    <section className="pageStandard">
      <section className="heading">{title}</section>
      <section className="content">{children}</section>
    </section>
  )
}

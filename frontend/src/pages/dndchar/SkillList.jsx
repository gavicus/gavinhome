

export const SkillList = ({items, level}) => {
  const getSkills = () => {
    const skills = items
    .filter(item => parseInt(item.level) <= level && item.type === 'skill')
    return skills.sort((a,b) => a.title.localeCompare(b.title))
  }

  return (
    <>
      <p>skills</p>
      <table>
        <tbody>
          {
            getSkills().map(skill => (
              <tr key={`skill-${skill.title}`}>
                <td>{skill.title}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

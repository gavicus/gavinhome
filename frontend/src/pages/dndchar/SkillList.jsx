

export const SkillList = ({items, level}) => {
  const getSkills = () => {
    if (!items) { return [] }

    const skills = items
    .filter(item => parseInt(item.level) <= level && item.type === 'skill')
    return skills.sort((a,b) => a.title.localeCompare(b.title))
  }

  const getSkillRank = (skill) => {
    if (skill.effects && skill.effects.length > 0) {
      return skill.effects[0].adder
    }
    return 0
  }
  
  const SkillEntry = ({skill}) => {
    return (
      <>
        <td>{skill.title}</td>
        <td>{getSkillRank(skill)}</td>
      </>
    )
  }

  return (
    <>
      <p>skills</p>
      <table>
        <tbody>
          {
            getSkills().map(skill => (
              <tr key={`skill-${skill.title}`}>
                {<SkillEntry skill={skill} />}
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

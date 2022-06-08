

export const SkillList = ({items, level}) => {

  console.log({items})

  const getSkills = () => {
    if (!items) { return [] }

    const filtered = items
    .filter(item => parseInt(item.level) <= level && item.type === 'skill')

    const names = new Set()
    for (let item of filtered) {
      names.add(item.title)
    }
    const skills = []
    for (let name of names) {
      const myItems = filtered.filter(item => item.title === name)
      let rank = 0
      let stat, id
      for (let item of myItems) {
        const rankEffect = item.effects.find(e => e.item === 'rank')
        if (rankEffect) { rank += parseInt(rankEffect.adder) }
        const statEffect = item.effects.find(e => e.item === 'stat')
        if (statEffect) { stat = statEffect.adder }
      }
      skills.push({title:name,rank,stat})
    }

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
        <td>
          {skill.title} { skill.stat && <>({skill.stat})</> }
        </td>
        <td>{skill.rank}</td>
      </>
    )
  }

  return (
    <section className="form-section skills">
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
    </section>
  )
}

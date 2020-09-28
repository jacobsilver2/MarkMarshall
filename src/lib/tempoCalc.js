const tempoCalc = bpm => {
  const bpmInt = parseInt(bpm)

  if (bpmInt > 130) return tempoCategories[4]
  if (bpmInt > 110 && bpmInt <= 130) return tempoCategories[3]
  if (bpmInt >= 90 && bpmInt <= 110) return tempoCategories[2]
  if (bpmInt < 90 && bpmInt >= 60) return tempoCategories[1]
  if (bpmInt < 60) return tempoCategories[0]

  return "Unspecified"
}

export const tempoFilter = (filter, tempo) => {
  const tempoInt = parseInt(tempo)
  if (filter === tempoCategories[0] && tempoInt < 60) return true
  if (filter === tempoCategories[1] && tempoInt < 90 && tempoInt >= 60)
    return true
  if (filter === tempoCategories[2] && tempoInt >= 90 && tempoInt <= 110)
    return true
  if (filter === tempoCategories[3] && tempoInt > 110 && tempoInt <= 130)
    return true
  if (filter === tempoCategories[4] && tempoInt > 130) return true
  return false
}

export const tempoCategories = [
  "Very Slow (0-59 BPM)",
  "Slow (60-89 BPM)",
  "Medium (90-110 BPM)",
  "Fast (111-130 BPM)",
  "Very Fast (131+ BPM)",
]

export default tempoCalc

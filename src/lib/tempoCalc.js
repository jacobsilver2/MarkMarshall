const tempoCalc = bpm => {
  const bpmInt = parseInt(bpm)

  if (bpmInt > 130) return "Very Fast (131+ BPM)"
  if (bpmInt > 110 && bpmInt <= 130) return "Fast (111-130 BPM)"
  if (bpmInt >= 90 && bpmInt <= 110) return "Medium (90-110 BPM)"
  if (bpmInt < 90 && bpmInt >= 60) return "Slow (60-89 BPM)"
  if (bpmInt < 60) return "Very Slow (0-59 BPM)"

  return "Unspecified"
}

export const tempoFilter = (filter, tempo) => {
  const tempoInt = parseInt(tempo)
  if (filter === "Very Slow (0-59 BPM)" && tempoInt < 60) return true
  if (filter === "Slow (60-89 BPM)" && tempoInt < 90 && tempoInt >= 60)
    return true
  if (filter === "Medium (90-110 BPM)" && tempoInt >= 90 && tempoInt <= 110)
    return true
  if (filter === "Fast (111-130 BPM)" && tempoInt > 110 && tempoInt <= 130)
    return true
  if (filter === "Very Fast (131+ BPM)" && tempoInt > 130) return true
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

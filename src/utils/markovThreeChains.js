import nGram from 'n-gram'
// const text = 'Now is the,time for\'all good people'

function normalize (value) {
  const from = 'àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕ'
  const to = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyrr'

  for (let i = 0; i < from.length; i++) {
    const charRe = new RegExp(from.charAt(i), 'gim')
    value = value.toLowerCase().replace(charRe, to.charAt(i))
  }

  return value.toLowerCase()
}

const markovThreeChains = function (texts) {
  let text
  if (Array.isArray(texts)) {
    text = texts.join(' ')
  } else {
    text = texts || ''
  }
  const normalizeText = normalize(text)
  const words = normalizeText.split(/[\s,']/)
  const threeGrams = words.map(word => nGram.trigram(word))
  threeGrams.map(t => words.push(...t))
  const allNGrams = words.filter(word => word.length > 2)
  const uniqueItems = [...(new Set(allNGrams))]
  return uniqueItems
}
export default markovThreeChains

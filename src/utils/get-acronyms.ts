export const getAcronyms = (name: string) => {
  const hasSpace = name.trim().includes(' ')
  let splittedName = null
  if(hasSpace) {
    splittedName = name.split(' ')
    splittedName = splittedName[0][0] + splittedName[1][0]
    return splittedName
  }
  return splittedName = name.slice(0, 1)
}
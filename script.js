(function () {
  const CHARS_LEFT = ['(', '{', '[']
  const CHARS_RIGHT = [')', '}', ']']

  const isCorrect = (string = '') => {
    if (!string || !string.length) {
      return false
    }

    // сократим количество итераций (можно обойтись и без этой строчки)
    const onlyNonWordCharacters = string.replace(/\w/g, '')
    let openChars = []

    const recursion = (startIndex = 0) => {
      if (startIndex > onlyNonWordCharacters.length) {
        return true
      }

      const currentChar = onlyNonWordCharacters.charAt(startIndex)
      const charPosition = CHARS_LEFT.indexOf(currentChar)
      const secondCharPosition = CHARS_RIGHT.indexOf(currentChar)
      const nextChar = onlyNonWordCharacters.charAt(startIndex + 1)
      if (charPosition !== -1) {
        if (nextChar !== CHARS_RIGHT[charPosition]) {
          openChars.push(currentChar)
          return recursion(startIndex + 1)
        } else {
          return recursion(startIndex + 2)
        }
      } else if (secondCharPosition !== -1) {
        if (!openChars.length) {
          return false
        }

        // насчет этого условия ничего сказано не было, но я решил, что так правильней:
        // данное условие не пропустит строку вида [{]} и подобные,
        // то есть скобки должны закрываться до момента нахождения другого вида скобок
        if (openChars[openChars.length - 1] !== CHARS_LEFT[secondCharPosition]) {
          return false
        }

        let wasFind = false
        for (let j = openChars.length; j >= 0; j--) {
          if (openChars[j] === CHARS_LEFT[secondCharPosition]) {
            wasFind = true
            openChars = openChars.filter((el, index) => index !== j)
            break
          }
        }

        if (!wasFind) {
          return false
        } else {
          return recursion(startIndex + 1)
        }
      } else {
        return recursion(startIndex + 1)
      }
    }

    return recursion() && !openChars.length
  }

  const input = document.getElementById('input')
  const button = document.getElementById('button')

  button.addEventListener('click', () => alert(isCorrect(input.value)), false)
})()

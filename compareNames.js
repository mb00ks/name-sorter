const compareNames = (a, b) => {
  const firstWords = a.split(' ');
  const secondWords = b.split(' ');

  const firstLastName = firstWords.pop();
  const secondLastName = secondWords.pop();

  const result = firstLastName.localeCompare(secondLastName);

  if (result === 0) {
    const nextFirstWords = firstWords.join(' ');
    const nextSecondWords = secondWords.join(' ');

    if (nextFirstWords || nextSecondWords) {
      return compareNames(firstWords.join(' '), secondWords.join(' '));
    }

    return 0;
  }

  return result;
}

module.exports = compareNames;

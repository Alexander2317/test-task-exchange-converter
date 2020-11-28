// @flow

type Props = {
  elements: Array<string>,
  element: string,
}

const getFirstNonRepeatingElement = ({
  elements,
  element,
}: Props): string | Object => {
  if (!elements.length) {
    throw new Error("Array shouldn't be empty")
  }
  if (elements.length < 2) {
    throw new Error('Array should have minimum 2 elements')
  }

  return elements.filter((item) => item !== element)[0]
}

export default getFirstNonRepeatingElement

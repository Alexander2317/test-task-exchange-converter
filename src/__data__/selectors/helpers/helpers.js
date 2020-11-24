// @flow

export const getIdentifier = (x: string): string => x

type GetStoreKeyProps = {
  name: string,
  key: string,
}

export const getStoreKey = ({ name, key }: GetStoreKeyProps): Object => (
  state: Object,
): any => state[name][key]

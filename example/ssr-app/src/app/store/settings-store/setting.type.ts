export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type SettingState = {
  theme: Theme
  count: number
  loaded: boolean
}

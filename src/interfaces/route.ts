/**
 * Interface Route
 */
export interface Route {
    method: string
    path: string
    config: {
      auth?: false
      handler: (req: any) => any
      description?: string
      validate?: any
    }
}
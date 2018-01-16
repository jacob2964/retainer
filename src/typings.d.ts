/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module jasmine {
  interface Matchers {
    toContainText(text: string, message?: string): boolean;
    toExist(message: string): boolean;
    toContainElementMatchingQuery(querySelector: string, message?: string): boolean;
    toHaveBeenCalledOnceWith(...expectedArgs: any[]): boolean;
    toThrowErrorCustomMessage(error: (...args: any[]) => Error, errorMessage: string, customMessage: string): boolean;
  }
}

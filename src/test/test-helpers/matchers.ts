beforeEach(() => {
    jasmine.addMatchers({
        toContainText: () => {
            return {
                compare: (actual: HTMLElement, expectedText: string, customMessage?: string) => {
                    const actualText = actual.textContent;
                    return {
                        pass: actualText.indexOf(expectedText) > -1,
                        get message() {
                            let failureMessage = 'Expected ' + actualText + ' to contain ' + expectedText;

                            if (customMessage) {
                                failureMessage = ' ' + customMessage;
                            }

                            return failureMessage;
                        }
                    };
                }
            };
        },

        toExist: () => {
            return {
                compare: (actual: HTMLElement, messageText: string) => {
                    const conditionPassed = (actual !== undefined && actual !== null);
                    return {
                        pass: conditionPassed,
                        get message() {
                            let failureMessage = messageText;
                            if (!failureMessage) {
                                if (conditionPassed) {
                                    failureMessage = 'Expected element NOT to exist.';
                                } else {
                                    failureMessage = 'Expected element to exist.';
                                }
                            }
                            return failureMessage;
                        }
                    };
                }
            };
        },

        toContainElementMatchingQuery: () => {
            return {
                compare: (actual: HTMLElement, querySelector: string, customMessageText?: string) => {
                    let conditionPassed = false;
                    if (actual !== undefined && actual !== null) {
                        const matchingElement = actual.querySelector(querySelector);
                        conditionPassed = (matchingElement !== undefined && matchingElement !== null);
                    }
                    return {
                        pass: conditionPassed,
                        get message() {
                            let messageRoot = '';
                            if (conditionPassed) {
                                messageRoot = 'Expected ' + actual.tagName + ' NOT to contain element matching "' + querySelector + '".';
                            } else {
                                messageRoot = 'Expected ' + actual.tagName + ' to contain element matching "' + querySelector + '".';
                            }

                            if (customMessageText) {
                                messageRoot = `${messageRoot}, ${customMessageText}`;
                            }

                            return messageRoot;
                        }
                    };
                }
            };
        },
        toHaveBeenCalledOnceWith: () => {
            return {
                compare: (actual: string, ...expectedArgs: any[]) => {
                    expect(actual).toHaveBeenCalledTimes(1);
                    expect(actual).toHaveBeenCalledWith(...expectedArgs);

                    return {
                        pass: true,
                        get message() {
                            return '';
                        }
                    };
                }
            };
        },
        toThrowErrorCustomMessage: () => {
            return {
                compare: (actual: () => any, error: new (...args: any[]) => Error, errorMessage?: string, customMessage?: string) => {
                    let conditionPassed = false;
                    try {
                        actual();
                    } catch (error) {
                        conditionPassed = true;
                    }
                    return {
                        pass: conditionPassed,
                        get message() {
                            return customMessage ? customMessage : '';
                        }
                    };
                }
            };
        }
    });
});

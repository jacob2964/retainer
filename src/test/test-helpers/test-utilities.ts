import { Any } from './any';
import { ComponentFixture } from '@angular/core/testing';

export class TestUtilities {
    public static getElementInnerText(selector: string, fixture: ComponentFixture<any>): string {
        const element = fixture.nativeElement.querySelector(selector);

        expect(element).toExist(`TestUtilities.getElementInnerText: Expected element to exist, ${selector}`);
        return element.innerText.trim();
    }

    public static getElementInnerTextFromArray(selector: string, index: number, fixture: ComponentFixture<any>): string {
        const element = fixture.nativeElement.querySelectorAll(selector)[index];

        expect(element).toExist(`TestUtilities.getElementInnerText: Expected element to exist, ${selector}`);
        return element.innerText.trim();
    }

    public static getAttribute(selector: string, attribute: string, fixture: ComponentFixture<any>): any {
        const element = fixture.nativeElement.querySelector(selector);

        expect(element).toExist(`TestUtilities.getAttribute: Expected element to exist, ${selector}`);

        return element.getAttribute(attribute);
    }
}
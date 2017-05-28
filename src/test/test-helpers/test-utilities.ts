import { MockConnection, MockBackend } from '@angular/http/testing';
import { Any } from './any';
import { ResponseOptions, Response } from '@angular/http';

export class TestUtilities {
    public static mockHttpBackendToReturnException(mockedBackend: MockBackend, service: any): Response {
        const expectedMessage = Any.string(16);
        const responseOptions = new ResponseOptions({ status: 500, statusText: expectedMessage });
        const response = new Response(responseOptions);
        response.ok = false;
        response.type = 3;

        mockedBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockError(<any>response);
        });

        return response;
    }
}